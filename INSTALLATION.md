# Sabrhub n8n Node Installation Guide

## Quick Installation

### Method 1: Direct Installation (Recommended)

1. **Build the node:**
   ```bash
   npm run build
   ```

2. **Copy to n8n community nodes directory:**
   - Find your n8n data directory (usually `~/.n8n` on Linux/Mac or `%APPDATA%\n8n` on Windows)
   - Copy the entire `dist` folder to `{n8n-data-directory}/nodes/`
   - The final structure should be:
     ```
     {n8n-data-directory}/nodes/
     ├── dist/
     │   ├── nodes/
     │   │   └── Sabrhub/
     │   │       ├── Sabrhub.node.js
     │   │       └── sabrhub.svg
     │   └── credentials/
     │       └── SabrhubApi/
     │           └── SabrhubApi.credentials.js
     ```

3. **Restart n8n:**
   ```bash
   n8n start
   ```

### Method 2: Development Installation

1. **Clone and build:**
   ```bash
   git clone https://github.com/sabrhub/n8n-nodes-sabrhub.git
   cd n8n-nodes-sabrhub
   npm install
   npm run build
   ```

2. **Link for development:**
   ```bash
   npm link
   # In your n8n project directory
   npm link n8n-nodes-sabrhub
   ```

## Verification

Run the test script to verify everything is working:

```bash
node test-node.js
```

You should see all green checkmarks indicating successful installation.

## Usage in n8n

1. **Create a new workflow** or open an existing one
2. **Add the Sabrhub node** from the node palette
3. **Configure credentials:**
   - API Key: Your Sabrhub API key
   - Environment: Production or Development
   - URLs: Use defaults or specify custom endpoints
4. **Configure the node:**
   - Resource: SMS
   - Operation: Send
   - Fill in the required fields (Enterprise ID, phone numbers, message)

## Troubleshooting

### Node not appearing in n8n
- Ensure the `dist` folder is in the correct location
- Check that n8n has been restarted
- Verify the file permissions are correct

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check that TypeScript is properly configured
- Ensure you have Node.js 16+ installed

### Runtime errors
- Verify your API key is correct
- Check that the phone numbers include country codes (+1, +44, etc.)
- Ensure the enterprise ID is valid

## Support

For issues and questions:
- Create an issue on GitHub
- Contact Sabrhub support at support@sabrhub.com
