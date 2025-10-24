import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SabrhubApi implements ICredentialType {
	name = 'sabrhubApi';
	displayName = 'Sabrhub API';
	documentationUrl = 'https://sabrhub.com/docs/api';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Production',
					value: 'production',
				},
				{
					name: 'Development',
					value: 'development',
				},
			],
			default: 'production',
			required: true,
		},
		{
			displayName: 'Production URL',
			name: 'prodUrl',
			type: 'string',
			default: 'https://context-sms.sabrhub.com',
			displayOptions: {
				show: {
					environment: ['production'],
				},
			},
		},
		{
			displayName: 'Development URL',
			name: 'devUrl',
			type: 'string',
			default: 'https://teams-dev-backend.sabrhub.com',
			displayOptions: {
				show: {
					environment: ['development'],
				},
			},
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.environment === "production" ? $credentials.prodUrl : $credentials.devUrl}}',
			url: '/outbound/send-sms',
			method: 'POST',
			body: {
				toNumber: '+1234567890',
				messageText: 'Test message from n8n',
				fromNumber: '+1234567890',
			},
		},
	};
}
