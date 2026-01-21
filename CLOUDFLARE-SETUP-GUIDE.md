# Complete Cloudflare Setup Guide for chom.pm

This guide will walk you through setting up your domain `chom.pm` with Cloudflare and deploying your URL shortener.

## Part 1: Adding Domain to Cloudflare

### Step 1: Sign Up / Login to Cloudflare
1. Go to https://cloudflare.com
2. Sign up for a free account or login if you already have one

### Step 2: Add Your Domain to Cloudflare
1. Click **"Add a Site"** button
2. Enter your domain: `chom.pm`
3. Click **"Add Site"**
4. Select the **Free Plan** (or any plan you prefer)
5. Click **"Continue"**

### Step 3: Wait for DNS Record Scan
1. Cloudflare will automatically scan your existing DNS records
2. Review the records it found (if any)
3. Click **"Continue"** to proceed

### Step 4: Get Your Cloudflare Nameservers
Cloudflare will display two nameservers that look like:
```
ns1.cloudflare.com
ns2.cloudflare.com
```
(Your actual nameservers will have specific names like `aron.ns.cloudflare.com` and `blake.ns.cloudflare.com`)

**IMPORTANT: Keep this page open - you'll need these nameserver addresses**

---

## Part 2: Update Nameservers at internet.bs

### Step 1: Login to internet.bs
1. Go to https://www.internet.bs/
2. Login to your account

### Step 2: Access Domain Management
1. Click **"Domains"** or **"My Domains"** in the menu
2. Find `chom.pm` in your domain list
3. Click on the domain name to open domain settings

### Step 3: Update Nameservers
1. Look for **"Nameservers"** or **"DNS"** settings
2. Select **"Use custom nameservers"** (not internet.bs nameservers)
3. Enter the two Cloudflare nameservers you got in Part 1, Step 4:
   - Nameserver 1: `aron.ns.cloudflare.com` (use your actual nameserver)
   - Nameserver 2: `blake.ns.cloudflare.com` (use your actual nameserver)
4. **Save/Update** the nameserver settings

### Step 4: Wait for Propagation
- DNS propagation typically takes 2-24 hours
- You'll receive an email from Cloudflare when it's active
- You can check status at https://dash.cloudflare.com

---

## Part 3: Configure Cloudflare Settings (After DNS Active)

### Step 1: SSL/TLS Settings
1. Go to Cloudflare Dashboard > `chom.pm`
2. Click **"SSL/TLS"** in the sidebar
3. Set SSL/TLS encryption mode to **"Full"** or **"Full (strict)"**

### Step 2: Add DNS Records (if needed)
1. Go to **"DNS"** section
2. If you want `chom.pm` to point to your worker:
   - You'll add an A record or configure after worker deployment
   - For now, you can skip this - we'll handle it after deploying the worker

---

## Part 4: Install Wrangler and Deploy Worker

### Step 1: Install Dependencies
```bash
# Make sure you're in the project directory
cd /home/user/urls

# Install Node dependencies
npm install
```

### Step 2: Login to Cloudflare via Wrangler
```bash
npx wrangler login
```
This will open a browser window. Authorize Wrangler to access your Cloudflare account.

### Step 3: Create KV Namespace
```bash
npx wrangler kv:namespace create "URLS"
```

This will output something like:
```
{ binding = "URLS", id = "abc123def456..." }
```

**Copy the `id` value** and update `wrangler.toml`:

Open `wrangler.toml` and replace the KV namespace ID:
```toml
[[kv_namespaces]]
binding = "URLS"
id = "abc123def456..."  # Replace with your actual ID
```

### Step 4: Set Admin Password and API Key
For production security, use Wrangler secrets:

```bash
# Set admin password (you'll be prompted to enter it)
npx wrangler secret put ADMIN_PASSWORD

# Set API key (you'll be prompted to enter it)
npx wrangler secret put API_KEY
```

**Choose strong passwords!** For example:
- Admin Password: A strong passphrase like `MySecure-Admin-Pass-2026!`
- API Key: A random string like `sk_live_abc123XYZ789def456`

### Step 5: Deploy to Cloudflare Workers
```bash
npm run deploy
```

You should see output like:
```
Uploaded chomp-urls
Published chomp-urls
  https://chomp-urls.yourname.workers.dev
```

**Save this URL** - this is your worker URL!

### Step 6: Configure Custom Domain (chom.pm)

1. Go to Cloudflare Dashboard > **Workers & Pages**
2. Click on your worker: **chomp-urls**
3. Go to **Settings** > **Domains & Routes**
4. Click **"Add Custom Domain"**
5. Enter: `chom.pm`
6. Click **"Add Custom Domain"**

Cloudflare will automatically create the DNS records needed.

**Your URL shortener will now be live at: `https://chom.pm`**

---

## Part 5: Using Your URL Shortener

### Access the Admin Panel

1. Go to: `https://chom.pm/admin`
2. Login with the admin password you set in Part 4, Step 4
3. You'll see:
   - URL statistics
   - Form to create short URLs
   - List of all your short URLs
   - Delete buttons for each URL

### Creating Short URLs via Admin Panel

**Option 1: Random Short Code**
1. Enter long URL: `https://example.com/very/long/url/here`
2. Leave "Custom Short Code" blank
3. Click "Create Short URL"
4. You'll get a random code like: `https://chom.pm/abc123`

**Option 2: Custom Short Code**
1. Enter long URL: `https://example.com/my-newsletter`
2. Enter custom code: `newsletter`
3. Click "Create Short URL"
4. You'll get: `https://chom.pm/newsletter`

### Managing URLs
- View all URLs in the list below the form
- Click any short URL to test it (opens in new tab)
- Click "Delete" to remove a short URL
- Logout when done

---

## Part 6: Using the API

### API Authentication
All API requests require the `X-API-Key` header with the API key you set in Part 4, Step 4.

### Create Short URL via API

**Using cURL:**
```bash
curl -X POST https://chom.pm/api/shorten \
  -H "X-API-Key: your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/long/url"}'
```

**Response:**
```json
{
  "success": true,
  "shortCode": "abc123",
  "url": "https://example.com/long/url",
  "shortUrl": "https://chom.pm/abc123"
}
```

**With Custom Short Code:**
```bash
curl -X POST https://chom.pm/api/shorten \
  -H "X-API-Key: your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/long/url", "shortCode": "custom"}'
```

### JavaScript Example

```javascript
async function createShortUrl(longUrl, customCode = null) {
  const response = await fetch('https://chom.pm/api/shorten', {
    method: 'POST',
    headers: {
      'X-API-Key': 'your-api-key-here',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: longUrl,
      shortCode: customCode // optional
    })
  });

  const data = await response.json();

  if (data.success) {
    console.log('Short URL created:', data.shortUrl);
    return data.shortUrl;
  } else {
    console.error('Error:', data.error);
    return null;
  }
}

// Usage
createShortUrl('https://example.com/very/long/url');
createShortUrl('https://example.com/newsletter', 'news-jan-2026');
```

### Python Example

```python
import requests
import json

def create_short_url(long_url, custom_code=None):
    url = 'https://chom.pm/api/shorten'
    headers = {
        'X-API-Key': 'your-api-key-here',
        'Content-Type': 'application/json'
    }

    payload = {'url': long_url}
    if custom_code:
        payload['shortCode'] = custom_code

    response = requests.post(url, headers=headers, json=payload)
    data = response.json()

    if data.get('success'):
        print(f"Short URL created: {data['shortUrl']}")
        return data['shortUrl']
    else:
        print(f"Error: {data.get('error')}")
        return None

# Usage
create_short_url('https://example.com/very/long/url')
create_short_url('https://example.com/newsletter', 'news-jan-2026')
```

### PHP Example

```php
<?php
function createShortUrl($longUrl, $customCode = null) {
    $url = 'https://chom.pm/api/shorten';

    $payload = ['url' => $longUrl];
    if ($customCode) {
        $payload['shortCode'] = $customCode;
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'X-API-Key: your-api-key-here',
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($response, true);

    if ($data['success']) {
        echo "Short URL created: " . $data['shortUrl'] . "\n";
        return $data['shortUrl'];
    } else {
        echo "Error: " . $data['error'] . "\n";
        return null;
    }
}

// Usage
createShortUrl('https://example.com/very/long/url');
createShortUrl('https://example.com/newsletter', 'news-jan-2026');
?>
```

---

## API Error Handling

### Common Error Responses

**Missing API Key (401):**
```json
{
  "success": false,
  "error": "API key required"
}
```

**Invalid API Key (401):**
```json
{
  "success": false,
  "error": "Invalid API key"
}
```

**Invalid URL (400):**
```json
{
  "success": false,
  "error": "Invalid URL format. URL must start with http:// or https://"
}
```

**Short Code Already Exists (409):**
```json
{
  "success": false,
  "error": "Short code already exists"
}
```

**Invalid Short Code (400):**
```json
{
  "success": false,
  "error": "Invalid short code. Use 3-20 characters: letters, numbers, underscore, or hyphen"
}
```

---

## Testing Your Setup

### 1. Test Admin Panel
```bash
# Open in browser
https://chom.pm/admin
```

### 2. Test API
```bash
# Test with cURL
curl -X POST https://chom.pm/api/shorten \
  -H "X-API-Key: your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com", "shortCode": "test"}'
```

### 3. Test Short URL Redirect
```bash
# Create a test short URL via admin or API, then visit it
https://chom.pm/test
# Should redirect to the long URL you specified
```

---

## Troubleshooting

### DNS Not Propagating
- Wait up to 24 hours
- Check status: https://www.whatsmydns.net/#NS/chom.pm
- Verify nameservers are correct at internet.bs

### Worker Not Deploying
```bash
# Check you're logged in
npx wrangler whoami

# If not logged in
npx wrangler login
```

### Admin Login Not Working
- Make sure you set the secret: `npx wrangler secret put ADMIN_PASSWORD`
- Clear browser localStorage (F12 > Application > Local Storage > Clear)
- Try incognito/private browsing

### API Key Not Working
- Verify you set the secret: `npx wrangler secret put API_KEY`
- Check the header name is exactly: `X-API-Key`
- Ensure you're using the exact key you set

### KV Namespace Errors
- Verify the namespace ID in `wrangler.toml` matches the one you created
- Check the binding name is exactly `URLS`

---

## Security Best Practices

1. **Never commit secrets to git**
   - Use `npx wrangler secret put` for production
   - Secrets in `wrangler.toml` [vars] are for development only

2. **Use strong passwords**
   - Admin password: at least 16 characters
   - API key: random, at least 32 characters

3. **Monitor usage**
   ```bash
   # View real-time logs
   npm run tail
   ```

4. **Rate limiting** (optional)
   - Consider adding rate limiting for production
   - Cloudflare offers built-in rate limiting rules

---

## What You Have Now

✅ **Domain**: chom.pm pointing to Cloudflare
✅ **URL Shortener**: Fully functional at https://chom.pm
✅ **Admin Panel**: Available at https://chom.pm/admin
✅ **Public API**: Available at https://chom.pm/api/shorten
✅ **Global CDN**: Powered by Cloudflare's edge network
✅ **SSL Certificate**: Automatic HTTPS via Cloudflare

---

## Next Steps

1. Create your first short URL via the admin panel
2. Test the API with your application
3. Share your short URLs!
4. Monitor usage via Cloudflare dashboard

For more detailed API examples including newsletter integrations, see `example-usage.md`.

---

## Support

- Cloudflare Docs: https://developers.cloudflare.com/workers/
- Wrangler Docs: https://developers.cloudflare.com/workers/wrangler/
- This project's README: `README.md`
