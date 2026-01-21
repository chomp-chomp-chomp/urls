# 🔗 Cloudflare Workers URL Shortener

A simple, fast, and secure URL shortener built with Cloudflare Workers and KV storage.

## Features

- ⚡ **Lightning Fast**: Built on Cloudflare's global edge network
- 🔒 **Secure Admin Panel**: Password-protected admin interface
- 🔑 **Public API**: API key authentication for external integration
- 🎨 **Beautiful UI**: Modern, responsive admin interface
- 📦 **KV Storage**: Serverless key-value storage for URLs
- 🚀 **Easy Deployment**: One-command deployment to Cloudflare
- 🔗 **Custom Short Codes**: Support for custom short URL codes
- 📊 **URL Management**: Create, list, and delete short URLs

## Project Structure

```
urls/
├── src/
│   ├── index.js          # Main Worker code
│   ├── admin.html        # Admin interface
│   └── utils.js          # Helper functions
├── wrangler.toml         # Cloudflare configuration
├── package.json
├── .gitignore
└── README.md
```

## Setup

### Prerequisites

- Node.js (v16 or higher)
- A Cloudflare account
- Wrangler CLI (installed via npm)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd urls
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Wrangler**:
   - Login to Cloudflare:
     ```bash
     npx wrangler login
     ```

4. **Create KV Namespace**:
   ```bash
   npx wrangler kv:namespace create "URLS"
   ```
   
   Copy the namespace ID from the output and update `wrangler.toml`:
   ```toml
   [[kv_namespaces]]
   binding = "URLS"
   id = "your-namespace-id-here"
   ```

5. **Set Admin Password**:
   - Edit `wrangler.toml` and change the `ADMIN_PASSWORD` and `API_KEY`:
     ```toml
     [vars]
     ADMIN_PASSWORD = "your-secure-password"
     API_KEY = "your-api-key-here"
     ```
   
   **Security Note**: For production, use Wrangler secrets instead:
   ```bash
   npx wrangler secret put ADMIN_PASSWORD
   npx wrangler secret put API_KEY
   ```

## Development

Run the development server locally:

```bash
npm run dev
```

This will start a local server at `http://localhost:8787`

## Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

Your URL shortener will be available at `https://chomp-urls.<your-subdomain>.workers.dev`

## Usage

### Admin Panel

1. Navigate to `/admin` on your deployed worker
2. Login with your admin password
3. Create short URLs:
   - Enter the long URL
   - Optionally specify a custom short code
   - Click "Create Short URL"
4. Manage existing URLs:
   - View all short URLs
   - Delete URLs you no longer need

### API Endpoints

#### Public API (for external integration)

##### Create Short URL (API Key Authentication)
```
POST /api/shorten
X-API-Key: your-api-key-here
Content-Type: application/json

{
  "url": "https://example.com/long/url",
  "shortCode": "custom" // optional
}
```

**Response:**
```json
{
  "success": true,
  "shortCode": "abc123",
  "url": "https://example.com/long/url",
  "shortUrl": "https://your-worker.workers.dev/abc123"
}
```

**Example with cURL:**
```bash
curl -X POST https://your-worker.workers.dev/api/shorten \
  -H "X-API-Key: your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/long/url"}'
```

**Example with JavaScript:**
```javascript
const response = await fetch('https://your-worker.workers.dev/api/shorten', {
  method: 'POST',
  headers: {
    'X-API-Key': 'your-api-key-here',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com/long/url',
    shortCode: 'newsletter-jan' // optional
  })
});

const data = await response.json();
console.log(data.shortUrl);
```

**For more examples and integration patterns, see [example-usage.md](example-usage.md)** which includes:
- Newsletter platform integrations (Mailchimp, SendGrid, Substack)
- Examples in multiple languages (JavaScript, Python, PHP, Shell)
- Best practices for batch processing and error handling
- Troubleshooting guide

#### Admin Endpoints

#### Admin Login
```
POST /admin/login
Content-Type: application/json

{
  "password": "your-password"
}
```

#### Create Short URL
```
POST /admin/create
Authorization: <token>
Content-Type: application/json

{
  "url": "https://example.com/long/url",
  "shortCode": "custom" // optional
}
```

#### List All URLs
```
GET /admin/list
Authorization: <token>
```

#### Delete URL
```
DELETE /admin/delete/{shortCode}
Authorization: <token>
```

#### Redirect (Public)
```
GET /{shortCode}
```

## Security

- Admin panel is protected with password authentication
- Simple token-based authentication (consider JWT for production)
- CORS enabled for API endpoints
- Input validation for URLs and short codes

### Production Security Recommendations

1. Use Wrangler secrets for sensitive data:
   ```bash
   npx wrangler secret put ADMIN_PASSWORD
   ```

2. Implement rate limiting to prevent abuse

3. Consider adding HTTPS-only redirects

4. Use JWT tokens for authentication instead of basic tokens

5. Add IP-based access control for admin routes

## Configuration

### wrangler.toml

```toml
name = "chomp-urls"              # Worker name
main = "src/index.js"            # Entry point
compatibility_date = "2024-01-20"

[[kv_namespaces]]
binding = "URLS"                  # KV binding name
id = "your-namespace-id"          # Your KV namespace ID

[vars]
ADMIN_PASSWORD = "changeme"       # Admin password (use secrets in prod)
```

## Monitoring

View logs in real-time:

```bash
npm run tail
```

## Troubleshooting

### KV Namespace Issues
- Ensure the KV namespace is created and the ID is correct in `wrangler.toml`
- Check that the binding name matches (`URLS`)

### Authentication Issues
- Verify the admin password is set correctly
- Clear browser local storage if having login issues

### Deployment Issues
- Ensure you're logged in: `npx wrangler whoami`
- Check your Cloudflare account has Workers enabled

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
