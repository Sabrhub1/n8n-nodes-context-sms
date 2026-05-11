import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

export class Sabrhub implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ContextSMS',
		name: 'sabrhub',
		icon: 'file:sabrhub.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Send SMS messages via Sabrhub API',
		defaults: {
			name: 'ContextSMS',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'sabrhubApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'SMS',
						value: 'sms',
					},
				],
				default: 'sms',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['sms'],
					},
				},
				options: [
					{
						name: 'Send',
						value: 'send',
						action: 'Send SMS',
						description: 'Send an SMS message',
					},
				],
				default: 'send',
			},
			{
				displayName: 'To Number',
				name: 'toNumber',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
				description: 'The recipient phone number (e.g., +12067452650)',
			},
			{
				displayName: 'From Number',
				name: 'fromNumber',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
				description: 'The sender phone number (e.g., +17373138331)',
			},
			{
				displayName: 'Message Text',
				name: 'messageText',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
				description: 'The SMS message content',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				if (resource === 'sms' && operation === 'send') {
					const toNumber = this.getNodeParameter('toNumber', i) as string;
					const fromNumber = this.getNodeParameter('fromNumber', i) as string;
					const messageText = this.getNodeParameter('messageText', i) as string;

					// Validate phone numbers
					if (!toNumber.startsWith('+')) {
						throw new NodeOperationError(this.getNode(), 'To Number must start with + (e.g., +12067452650)');
					}
					if (!fromNumber.startsWith('+')) {
						throw new NodeOperationError(this.getNode(), 'From Number must start with + (e.g., +17373138331)');
					}

					// Get the base URL from credentials
					const credentials = await this.getCredentials('sabrhubApi');
					const baseURL = credentials.environment === 'production' 
						? credentials.prodUrl 
						: credentials.devUrl;

					let responseData;
					try {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'sabrhubApi',
							{
								method: 'POST',
								url: `${baseURL}/outbound/send-sms`,
								body: {
									toNumber,
									messageText,
									fromNumber,
								},
							},
						);
					} catch (error) {
						throw new NodeApiError(this.getNode(), error as JsonObject);
					}

					returnData.push({
						json: responseData,
						pairedItem: { item: i },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error instanceof Error ? error.message : String(error) },
						pairedItem: { item: i },
					});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}

