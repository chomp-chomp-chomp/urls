# API Usage Examples

This document provides practical examples of using the URL shortener API for automatic link shortening in various scenarios.

## Setup

1. Deploy your URL shortener to Cloudflare Workers
2. Set your API key using Wrangler secrets (recommended for production):
   ```bash
   npx wrangler secret put API_KEY
   ```
3. Note your worker URL (e.g., `https://chomp-urls.your-subdomain.workers.dev`)

## Newsletter Use Case

### Node.js/JavaScript Example

```javascript
/**
 * Shorten a URL for use in a newsletter
 */
async function shortenForNewsletter(longUrl, customCode = null) {
  const response = await fetch('https://chomp-urls.your-subdomain.workers.dev/api/shorten', {
    method: 'POST',
    headers: {
      'X-API-Key': process.env.URL_SHORTENER_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: longUrl,
      shortCode: customCode, // optional
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to shorten URL: ${error.message}`);
  }

  const data = await response.json();
  return data.shortUrl;
}

// Usage example
async function prepareNewsletter() {
  try {
    // Shorten multiple links for your newsletter
    const article1 = await shortenForNewsletter(
      'https://example.com/articles/2024/01/long-article-title-here',
      'jan-article1' // custom short code for tracking
    );
    
    const article2 = await shortenForNewsletter(
      'https://example.com/articles/2024/01/another-long-article-title'
      // no custom code - will generate random one
    );
    
    console.log('Article 1 short link:', article1);
    console.log('Article 2 short link:', article2);
    
    // Use these short links in your newsletter template
    const newsletterHTML = `
      <h2>This Week's Articles</h2>
      <ul>
        <li><a href="${article1}">Article 1</a></li>
        <li><a href="${article2}">Article 2</a></li>
      </ul>
    `;
    
    return newsletterHTML;
  } catch (error) {
    console.error('Error shortening URLs:', error);
  }
}
```

### Python Example

```python
import requests
import os

def shorten_url(long_url, short_code=None):
    """
    Shorten a URL using the API
    """
    api_url = 'https://chomp-urls.your-subdomain.workers.dev/api/shorten'
    headers = {
        'X-API-Key': os.environ['URL_SHORTENER_API_KEY'],
        'Content-Type': 'application/json',
    }
    
    payload = {'url': long_url}
    if short_code:
        payload['shortCode'] = short_code
    
    response = requests.post(api_url, json=payload, headers=headers)
    response.raise_for_status()
    
    data = response.json()
    return data['shortUrl']

# Usage in newsletter script
def prepare_newsletter():
    articles = [
        {
            'title': 'Article 1',
            'url': 'https://example.com/articles/long-url-1',
            'code': 'jan-week1-art1'
        },
        {
            'title': 'Article 2',
            'url': 'https://example.com/articles/long-url-2',
            'code': 'jan-week1-art2'
        }
    ]
    
    # Shorten all URLs
    for article in articles:
        try:
            article['shortUrl'] = shorten_url(article['url'], article['code'])
            print(f"Shortened {article['title']}: {article['shortUrl']}")
        except Exception as e:
            print(f"Error shortening {article['title']}: {e}")
    
    return articles
```

### cURL Example (for shell scripts)

```bash
#!/bin/bash

# Set your API key
API_KEY="your-api-key-here"
API_URL="https://chomp-urls.your-subdomain.workers.dev/api/shorten"

# Function to shorten a URL
shorten_url() {
    local long_url="$1"
    local short_code="$2"
    
    local payload="{\"url\":\"$long_url\""
    if [ -n "$short_code" ]; then
        payload="$payload,\"shortCode\":\"$short_code\""
    fi
    payload="$payload}"
    
    curl -s -X POST "$API_URL" \
        -H "X-API-Key: $API_KEY" \
        -H "Content-Type: application/json" \
        -d "$payload" | jq -r '.shortUrl'
}

# Example: Prepare newsletter links
echo "Shortening newsletter links..."
LINK1=$(shorten_url "https://example.com/article1" "jan-art1")
LINK2=$(shorten_url "https://example.com/article2" "jan-art2")

echo "Link 1: $LINK1"
echo "Link 2: $LINK2"
```

### PHP Example

```php
<?php

function shortenUrl($longUrl, $shortCode = null) {
    $apiUrl = 'https://chomp-urls.your-subdomain.workers.dev/api/shorten';
    $apiKey = getenv('URL_SHORTENER_API_KEY');
    
    $data = ['url' => $longUrl];
    if ($shortCode !== null) {
        $data['shortCode'] = $shortCode;
    }
    
    $options = [
        'http' => [
            'header'  => [
                "Content-Type: application/json",
                "X-API-Key: $apiKey"
            ],
            'method'  => 'POST',
            'content' => json_encode($data),
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($apiUrl, false, $context);
    
    if ($result === FALSE) {
        throw new Exception('Failed to shorten URL');
    }
    
    $response = json_decode($result, true);
    return $response['shortUrl'];
}

// Usage
try {
    $shortUrl = shortenUrl('https://example.com/long-article-url', 'jan-article');
    echo "Short URL: $shortUrl\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
```

## Best Practices

### 1. Custom Short Codes
Use meaningful custom short codes for tracking and analytics:
```javascript
// Good - traceable and organized
await shortenUrl('https://example.com/article', 'newsletter-2024-01-15');
await shortenUrl('https://example.com/promo', 'promo-jan-special');

// Avoid - hard to track
await shortenUrl('https://example.com/article'); // random code
```

### 2. Error Handling
Always handle errors gracefully:
```javascript
async function shortenWithFallback(longUrl, shortCode) {
  try {
    return await shortenUrl(longUrl, shortCode);
  } catch (error) {
    console.error('URL shortening failed:', error);
    // Fallback to original URL
    return longUrl;
  }
}
```

### 3. Batch Processing
When shortening multiple URLs, process them concurrently:
```javascript
async function shortenMultiple(urls) {
  const promises = urls.map(({url, code}) => 
    shortenUrl(url, code).catch(err => ({error: err, url}))
  );
  
  return await Promise.all(promises);
}
```

### 4. Security
- Never commit API keys to version control
- Use environment variables for API keys
- Rotate API keys periodically
- Use HTTPS for all API requests

### 5. Rate Limiting
Consider implementing rate limiting on your end to avoid overwhelming the API:
```javascript
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function shortenWithDelay(urls, delayMs = 100) {
  const results = [];
  for (const url of urls) {
    results.push(await shortenUrl(url));
    await delay(delayMs);
  }
  return results;
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "shortCode": "abc123",
  "url": "https://example.com/long/url",
  "shortUrl": "https://chomp-urls.your-subdomain.workers.dev/abc123"
}
```

### Error Responses

**401 Unauthorized** - Invalid or missing API key:
```json
{
  "error": "Unauthorized",
  "message": "Valid API key required in X-API-Key header"
}
```

**400 Bad Request** - Invalid URL or short code:
```json
{
  "error": "Invalid URL format"
}
```

**409 Conflict** - Short code already exists:
```json
{
  "error": "Short code already exists"
}
```

## Integration with Newsletter Platforms

### Mailchimp
```javascript
// In your Mailchimp campaign preparation script
async function prepareMailchimpCampaign(articles) {
  const campaignContent = {
    sections: await Promise.all(
      articles.map(async (article) => ({
        title: article.title,
        link: await shortenUrl(article.url, `mc-${article.id}`)
      }))
    )
  };
  
  // Send to Mailchimp API
  return campaignContent;
}
```

### SendGrid
```javascript
// In your SendGrid email template
async function createSendGridEmail(links) {
  const shortenedLinks = await Promise.all(
    links.map(link => shortenUrl(link.url, `sg-${link.id}`))
  );
  
  const html = shortenedLinks
    .map(url => `<a href="${url}">Read more</a>`)
    .join('<br>');
    
  return html;
}
```

### Substack
```javascript
// For Substack posts
async function shortenSubstackLinks(post) {
  // Replace long URLs with short ones
  const urlPattern = /https?:\/\/[^\s<>"]+/g;
  
  const matches = [...post.content.matchAll(urlPattern)];
  
  for (const match of matches) {
    const longUrl = match[0];
    const shortUrl = await shortenUrl(longUrl);
    post.content = post.content.replace(longUrl, shortUrl);
  }
  
  return post;
}
```

## Troubleshooting

### CORS Issues
If you encounter CORS errors when calling from a browser:
- Ensure your worker has CORS headers enabled (already included in this implementation)
- The API includes `Access-Control-Allow-Origin: *` by default

### Authentication Issues
- Verify your API key is correct
- Check that you're using the `X-API-Key` header (case-sensitive)
- Ensure the API key is set in your worker's environment variables

### URL Validation Issues
- URLs must include `http://` or `https://` protocol
- URLs must be valid and parseable
- Custom short codes must be 3-20 characters (letters, numbers, _, -)

## Support

For issues or questions:
1. Check the README.md for basic setup
2. Review this examples file for common use cases
3. Open an issue on GitHub
