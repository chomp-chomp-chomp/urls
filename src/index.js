import {
  generateShortCode,
  isValidUrl,
  checkPassword,
  jsonResponse,
  htmlResponse,
} from './utils.js';

import adminHtml from './admin.html';

/**
 * Main Worker fetch handler
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // Admin routes
    if (path.startsWith('/admin')) {
      return handleAdmin(request, env, path);
    }

    // Root path - show simple info
    if (path === '/') {
      return htmlResponse(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>URL Shortener</title>
            <style>
              body {
                font-family: sans-serif;
                max-width: 600px;
                margin: 100px auto;
                text-align: center;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                color: white;
              }
              h1 { font-size: 48px; margin-bottom: 20px; }
              p { font-size: 18px; line-height: 1.6; }
              a { color: #fff; text-decoration: underline; }
            </style>
          </head>
          <body>
            <h1>🔗 URL Shortener</h1>
            <p>Welcome to the URL shortener service.</p>
            <p><a href="/admin">Admin Panel</a></p>
          </body>
        </html>
      `);
    }

    // Handle short URL redirect
    const shortCode = path.substring(1); // Remove leading slash
    if (shortCode) {
      return handleRedirect(env, shortCode);
    }

    return jsonResponse({ error: 'Not found' }, 404);
  },
};

/**
 * Handle admin routes
 */
async function handleAdmin(request, env, path) {
  // Serve admin HTML
  if (path === '/admin' || path === '/admin/') {
    return htmlResponse(adminHtml);
  }

  // Admin login
  if (path === '/admin/login' && request.method === 'POST') {
    return handleLogin(request, env);
  }

  // Verify authentication for other admin routes
  const authToken = request.headers.get('Authorization');
  if (!verifyAuth(authToken, env)) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  // Create short URL
  if (path === '/admin/create' && request.method === 'POST') {
    return handleCreate(request, env);
  }

  // List URLs
  if (path === '/admin/list' && request.method === 'GET') {
    return handleList(env);
  }

  // Delete URL
  if (path.startsWith('/admin/delete/') && request.method === 'DELETE') {
    const shortCode = path.split('/admin/delete/')[1];
    return handleDelete(env, shortCode);
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

/**
 * Handle login
 */
async function handleLogin(request, env) {
  try {
    const { password } = await request.json();
    
    if (!password) {
      return jsonResponse({ error: 'Password required' }, 400);
    }

    const correctPassword = env.ADMIN_PASSWORD || 'changeme';
    
    if (checkPassword(password, correctPassword)) {
      // Generate simple token (in production, use JWT or similar)
      const token = btoa(`${password}:${Date.now()}`);
      return jsonResponse({ success: true, token });
    }

    return jsonResponse({ error: 'Invalid password' }, 401);
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

/**
 * Verify authentication token
 */
function verifyAuth(token, env) {
  if (!token) return false;
  
  try {
    const decoded = atob(token);
    const [password] = decoded.split(':');
    const correctPassword = env.ADMIN_PASSWORD || 'changeme';
    return checkPassword(password, correctPassword);
  } catch (error) {
    return false;
  }
}

/**
 * Handle URL creation
 */
async function handleCreate(request, env) {
  try {
    const { url, shortCode } = await request.json();

    if (!url) {
      return jsonResponse({ error: 'URL is required' }, 400);
    }

    if (!isValidUrl(url)) {
      return jsonResponse({ error: 'Invalid URL format' }, 400);
    }

    // Generate or validate short code
    let code = shortCode;
    if (code) {
      // Check if custom code already exists
      const existing = await env.URLS.get(code);
      if (existing) {
        return jsonResponse({ error: 'Short code already exists' }, 409);
      }
      // Validate custom code format
      if (!/^[a-zA-Z0-9_-]{3,20}$/.test(code)) {
        return jsonResponse({ 
          error: 'Short code must be 3-20 characters (letters, numbers, _, -)' 
        }, 400);
      }
    } else {
      // Generate random code
      code = generateShortCode();
      // Ensure it doesn't exist (very unlikely but possible)
      let attempts = 0;
      while (await env.URLS.get(code) && attempts < 10) {
        code = generateShortCode();
        attempts++;
      }
    }

    // Store the URL
    await env.URLS.put(code, url);

    return jsonResponse({
      success: true,
      shortCode: code,
      url,
      shortUrl: `/${code}`,
    });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

/**
 * Handle listing all URLs
 */
async function handleList(env) {
  try {
    const list = await env.URLS.list();
    const urls = await Promise.all(
      list.keys.map(async (key) => {
        const url = await env.URLS.get(key.name);
        return {
          shortCode: key.name,
          url,
        };
      })
    );

    return jsonResponse({ urls });
  } catch (error) {
    return jsonResponse({ error: 'Failed to list URLs' }, 500);
  }
}

/**
 * Handle URL deletion
 */
async function handleDelete(env, shortCode) {
  if (!shortCode) {
    return jsonResponse({ error: 'Short code required' }, 400);
  }

  const url = await env.URLS.get(shortCode);
  if (!url) {
    return jsonResponse({ error: 'Short URL not found' }, 404);
  }

  await env.URLS.delete(shortCode);
  return jsonResponse({ success: true });
}

/**
 * Handle redirect
 */
async function handleRedirect(env, shortCode) {
  const url = await env.URLS.get(shortCode);

  if (!url) {
    return htmlResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Not Found</title>
          <style>
            body {
              font-family: sans-serif;
              max-width: 600px;
              margin: 100px auto;
              text-align: center;
            }
            h1 { color: #dc3545; }
          </style>
        </head>
        <body>
          <h1>404 - Short URL Not Found</h1>
          <p>The short URL "/${shortCode}" does not exist.</p>
          <p><a href="/">Go to home</a></p>
        </body>
      </html>
    `,
      404
    );
  }

  // Redirect to the long URL
  return Response.redirect(url, 302);
}
