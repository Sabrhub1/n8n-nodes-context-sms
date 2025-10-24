# n8n-nodes-context-sms

[![npm version](https://badge.fury.io/js/n8n-nodes-context-sms.svg)](https://badge.fury.io/js/n8n-nodes-context-sms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A custom n8n node for integrating with Sabrhub SMS API. This node allows you to send SMS messages through your n8n workflows using the Sabrhub messaging platform.

## Features

- **Send SMS Messages**: Send text messages to any phone number
- **Environment Support**: Switch between production and development environments
- **API Key Authentication**: Secure authentication using API keys
- **Error Handling**: Comprehensive error handling and validation
- **Phone Number Validation**: Automatic validation of phone number formats

## Installation

### From npm (Recommended)
```bash
npm install n8n-nodes-context-sms
```

### From source
1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

## Usage

### 1. Add the Node to n8n

1. In your n8n instance, go to Settings > Community Nodes
2. Click "Install a community node"
3. Enter the package name: `n8n-nodes-context-sms`
4. Click "Install"

Alternatively, if you have n8n installed locally:
```bash
npm install n8n-nodes-context-sms
```

### 2. Configure Credentials

1. Create a new workflow or open an existing one
2. Add the "Context SMS" node to your workflow
3. Click on the node and go to the "Credentials" tab
4. Create new credentials with the following information:
   - **API Key**: Your Sabrhub API key (e.g., `mx_dffb6a98dc315076bbe590244f779ecd_17606086476322`)
   - **Environment**: Choose between Production or Development
   - **Production URL**: `https://context-sms.sabrhub.com` (default)
   - **Development URL**: `https://teams-dev-backend.sabrhub.com` (default)

### 3. Configure the Node

1. Select the "SMS" resource
2. Choose the "Send" operation
3. Fill in the required fields:
   - **To Number**: Recipient's phone number (e.g., `+12067452650`)
   - **From Number**: Sender's phone number (e.g., `+17373138331`)
   - **Message Text**: The SMS content

### 4. Example Workflow

Here's a simple example workflow that sends an SMS when triggered:

```json
{
  "nodes": [
    {
      "parameters": {},
      "id": "webhook-trigger",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [240, 300]
    },
    {
      "parameters": {
        "resource": "sms",
        "operation": "send",
        "toNumber": "={{$json.phone}}",
        "fromNumber": "+17373138331",
        "messageText": "Hello! This is a test message from n8n."
      },
      "id": "sabrhub-sms",
      "name": "Send SMS",
      "type": "n8n-nodes-context-sms.sabrhub",
      "typeVersion": 1,
      "position": [460, 300],
      "credentials": {
        "sabrhubApi": {
          "id": "your-credential-id",
          "name": "Sabrhub API"
        }
      }
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Send SMS",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

## API Reference

### Sabrhub SMS API

The node integrates with the Sabrhub SMS API endpoint:

- **Production**: `https://context-sms.sabrhub.com/outbound/send-sms`
- **Development**: `https://teams-dev-backend.sabrhub.com/outbound/send-sms`

#### Request Format

```json
{
  "toNumber": "string",
  "messageText": "string",
  "fromNumber": "string"
}
```

#### Headers

- `Content-Type: application/json`
- `X-API-Key: your-api-key`

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- n8n instance for testing

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sabrhub/n8n-nodes-context-sms.git
   cd n8n-nodes-context-sms
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

### Testing

1. Start your n8n instance in development mode:
   ```bash
   n8n start --tunnel
   ```

2. Install the node locally:
   ```bash
   npm run build
   # Copy the dist folder to your n8n community nodes directory
   ```

3. Test the node in your n8n workflow

### Scripts

- `npm run build` - Build the TypeScript files
- `npm run dev` - Watch mode for development
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Error Handling

The node includes comprehensive error handling:

- **Phone Number Validation**: Ensures phone numbers start with `+`
- **Required Field Validation**: Validates all required fields are provided
- **API Error Handling**: Handles API errors gracefully
- **Continue on Fail**: Option to continue workflow execution on errors

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- Create an issue on GitHub
- Contact Sabrhub support at support@sabrhub.com
- Check the [Sabrhub API documentation](https://sabrhub.com/docs/api)

## Changelog

### 1.0.0
- Initial release
- SMS sending functionality
- Environment support (production/development)
- API key authentication
- Phone number validation
