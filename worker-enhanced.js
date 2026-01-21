// ============================================================================
// ENHANCED CLOUDFLARE WORKER FOR URL SHORTENER
// ============================================================================
// Features: Auto-copy, Copy buttons, Page titles, and more!
// ============================================================================

const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL Shortener - Admin</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 800px;
            width: 100%;
            padding: 40px;
        }
        h1 { color: #333; margin-bottom: 30px; text-align: center; }
        .auth-section, .admin-section { display: none; }
        .auth-section.active, .admin-section.active { display: block; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 8px; color: #555; font-weight: 500; }
        input {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 6px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        input:focus { outline: none; border-color: #667eea; }
        button {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        button:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }
        button:active { transform: translateY(0); }
        .url-list { margin-top: 30px; }
        .url-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #e9ecef;
        }
        .url-info { flex: 1; min-width: 0; }
        .short-url {
            color: #667eea;
            font-weight: 600;
            text-decoration: none;
            display: block;
            margin-bottom: 5px;
        }
        .page-title {
            color: #333;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 3px;
        }
        .long-url {
            color: #666;
            font-size: 13px;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .url-actions {
            display: flex;
            gap: 8px;
            margin-left: 10px;
            flex-shrink: 0;
        }
        .copy-btn, .delete-btn {
            padding: 8px 16px;
            width: auto;
            font-size: 14px;
        }
        .copy-btn {
            background: #28a745;
        }
        .copy-btn:hover {
            background: #218838;
        }
        .copy-btn.copied {
            background: #5cb85c;
        }
        .delete-btn {
            background: #dc3545;
        }
        .delete-btn:hover {
            background: #c82333;
        }
        .message {
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
            display: none;
        }
        .message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            display: block;
        }
        .message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            display: block;
        }
        .stats {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
        }
        .stats-number {
            font-size: 36px;
            font-weight: 700;
            color: #667eea;
        }
        .stats-label {
            color: #666;
            margin-top: 5px;
        }
        .logout-btn {
            background: #6c757d;
            margin-top: 20px;
        }
        .logout-btn:hover {
            background: #5a6268;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔗 URL Shortener Admin</h1>

        <div id="authSection" class="auth-section active">
            <div id="authMessage" class="message"></div>
            <form id="loginForm">
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Enter admin password" required>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>

        <div id="adminSection" class="admin-section">
            <div id="message" class="message"></div>

            <div class="stats">
                <div class="stats-number" id="urlCount">0</div>
                <div class="stats-label">Short URLs Created</div>
            </div>

            <form id="createForm">
                <div class="form-group">
                    <label for="longUrl">Long URL</label>
                    <input type="url" id="longUrl" placeholder="https://example.com/very/long/url" required>
                </div>
                <div class="form-group">
                    <label for="shortCode">Custom Short Code (optional)</label>
                    <input type="text" id="shortCode" placeholder="Leave blank for random code">
                </div>
                <button type="submit">Create Short URL</button>
            </form>

            <div class="url-list">
                <h2 style="margin-bottom: 15px; color: #333;">Your Short URLs</h2>
                <div id="urlsList"></div>
            </div>

            <button class="logout-btn" onclick="logout()">Logout</button>
        </div>
    </div>

    <script>
        let authToken = '';

        const savedToken = localStorage.getItem('adminToken');
        if (savedToken) {
            authToken = savedToken;
            loadUrls();
        }

        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password })
                });

                const data = await response.json();

                if (response.ok) {
                    authToken = data.token;
                    localStorage.setItem('adminToken', authToken);
                    showMessage('authMessage', 'Login successful!', 'success');
                    setTimeout(() => {
                        document.getElementById('authSection').classList.remove('active');
                        document.getElementById('adminSection').classList.add('active');
                        loadUrls();
                    }, 500);
                } else {
                    showMessage('authMessage', data.error || 'Login failed', 'error');
                }
            } catch (error) {
                showMessage('authMessage', 'Network error', 'error');
            }
        });

        document.getElementById('createForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const longUrl = document.getElementById('longUrl').value;
            const shortCode = document.getElementById('shortCode').value || undefined;

            try {
                const response = await fetch('/admin/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authToken
                    },
                    body: JSON.stringify({ url: longUrl, shortCode })
                });

                const data = await response.json();

                if (response.ok) {
                    const fullUrl = window.location.origin + '/' + data.shortCode;

                    // Auto-copy to clipboard
                    try {
                        await navigator.clipboard.writeText(fullUrl);
                        showMessage('message', 'Short URL created and copied to clipboard: ' + fullUrl, 'success');
                    } catch (err) {
                        showMessage('message', 'Short URL created: ' + fullUrl, 'success');
                    }

                    document.getElementById('createForm').reset();
                    loadUrls();
                } else {
                    if (response.status === 401) {
                        showMessage('message', 'Session expired. Please login again.', 'error');
                        logout();
                        return;
                    }
                    showMessage('message', data.error || 'Failed to create URL', 'error');
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
            }
        });

        async function loadUrls() {
            try {
                const response = await fetch('/admin/list', {
                    headers: { 'Authorization': authToken }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        showMessage('message', 'Session expired. Please login again.', 'error');
                        logout();
                        return;
                    }
                    throw new Error('Failed to load URLs');
                }

                const data = await response.json();
                displayUrls(data.urls);
                document.getElementById('urlCount').textContent = data.urls.length;

                document.getElementById('authSection').classList.remove('active');
                document.getElementById('adminSection').classList.add('active');
            } catch (error) {
                showMessage('message', 'Failed to load URLs', 'error');
            }
        }

        async function fetchPageTitle(url) {
            try {
                const response = await fetch('/admin/fetch-title', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authToken
                    },
                    body: JSON.stringify({ url })
                });
                const data = await response.json();
                return data.title || null;
            } catch (err) {
                return null;
            }
        }

        async function displayUrls(urls) {
            const urlsList = document.getElementById('urlsList');
            if (urls.length === 0) {
                urlsList.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No URLs yet. Create your first short URL!</p>';
                return;
            }

            // Fetch titles for all URLs
            const urlsWithTitles = await Promise.all(urls.map(async item => {
                const title = await fetchPageTitle(item.url);
                return { ...item, title };
            }));

            urlsList.innerHTML = urlsWithTitles.map(item =>
                '<div class="url-item">' +
                    '<div class="url-info">' +
                        '<a href="/' + item.shortCode + '" class="short-url" target="_blank">/' + item.shortCode + '</a>' +
                        (item.title ? '<div class="page-title">' + escapeHtml(item.title) + '</div>' : '') +
                        '<div class="long-url">' + escapeHtml(item.url) + '</div>' +
                    '</div>' +
                    '<div class="url-actions">' +
                        '<button class="copy-btn" onclick="copyUrl(\\'' + item.shortCode + '\\', this)">Copy</button>' +
                        '<button class="delete-btn" onclick="deleteUrl(\\'' + item.shortCode + '\\')">Delete</button>' +
                    '</div>' +
                '</div>'
            ).join('');
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        async function copyUrl(shortCode, button) {
            const fullUrl = window.location.origin + '/' + shortCode;
            try {
                await navigator.clipboard.writeText(fullUrl);
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.classList.add('copied');
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                showMessage('message', 'Failed to copy to clipboard', 'error');
            }
        }

        async function deleteUrl(shortCode) {
            if (!confirm('Delete short URL /' + shortCode + '?')) return;

            try {
                const response = await fetch('/admin/delete/' + shortCode, {
                    method: 'DELETE',
                    headers: { 'Authorization': authToken }
                });

                if (response.ok) {
                    showMessage('message', 'URL deleted successfully', 'success');
                    loadUrls();
                } else {
                    if (response.status === 401) {
                        showMessage('message', 'Session expired. Please login again.', 'error');
                        logout();
                        return;
                    }
                    const data = await response.json();
                    showMessage('message', data.error || 'Failed to delete URL', 'error');
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
            }
        }

        function logout() {
            authToken = '';
            localStorage.removeItem('adminToken');
            document.getElementById('adminSection').classList.remove('active');
            document.getElementById('authSection').classList.add('active');
            document.getElementById('password').value = '';
        }

        function showMessage(elementId, text, type) {
            const messageEl = document.getElementById(elementId);
            messageEl.textContent = text;
            messageEl.className = 'message ' + type;
            setTimeout(() => {
                messageEl.className = 'message';
            }, 5000);
        }
    </script>
</body>
</html>`;

// Utility Functions
function generateShortCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function isValidUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

function checkPassword(password, correctPassword) {
  return password === correctPassword;
}

function verifyApiKey(apiKey, correctApiKey) {
  return apiKey && correctApiKey && apiKey === correctApiKey;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
    },
  });
}

function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

// Admin Handlers
async function handleAdmin(request, env, path) {
  if (path === '/admin' || path === '/admin/') {
    return htmlResponse(adminHtml);
  }

  if (path === '/admin/login' && request.method === 'POST') {
    return handleLogin(request, env);
  }

  const authToken = request.headers.get('Authorization');
  if (!verifyAuth(authToken, env)) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  if (path === '/admin/create' && request.method === 'POST') {
    return handleCreate(request, env);
  }

  if (path === '/admin/list' && request.method === 'GET') {
    return handleList(env);
  }

  if (path === '/admin/fetch-title' && request.method === 'POST') {
    return handleFetchTitle(request);
  }

  if (path.startsWith('/admin/delete/') && request.method === 'DELETE') {
    const shortCode = path.split('/admin/delete/')[1];
    return handleDelete(env, shortCode);
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

async function handleLogin(request, env) {
  try {
    const { password } = await request.json();

    if (!password) {
      return jsonResponse({ error: 'Password required' }, 400);
    }

    const correctPassword = env.ADMIN_PASSWORD || 'changeme';

    if (checkPassword(password, correctPassword)) {
      const token = btoa(password + ':' + Date.now());
      return jsonResponse({ success: true, token });
    }

    return jsonResponse({ error: 'Invalid password' }, 401);
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

function verifyAuth(token, env) {
  if (!token) return false;

  try {
    const decoded = atob(token);
    const parts = decoded.split(':');
    const password = parts[0];
    const timestamp = parts[1];

    const correctPassword = env.ADMIN_PASSWORD || 'changeme';
    if (!checkPassword(password, correctPassword)) {
      return false;
    }

    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (tokenAge > maxAge) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function handleFetchTitle(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return jsonResponse({ error: 'URL required' }, 400);
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; URLShortenerBot/1.0)'
      }
    });

    if (!response.ok) {
      return jsonResponse({ title: null });
    }

    const html = await response.text();
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;

    return jsonResponse({ title });
  } catch (error) {
    return jsonResponse({ title: null });
  }
}

async function handleCreate(request, env) {
  try {
    const { url, shortCode } = await request.json();

    if (!url) {
      return jsonResponse({ error: 'URL is required' }, 400);
    }

    if (!isValidUrl(url)) {
      return jsonResponse({ error: 'Invalid URL format. URL must start with http:// or https://' }, 400);
    }

    let code = shortCode;
    if (code) {
      const existing = await env.URLS.get(code);
      if (existing) {
        return jsonResponse({ error: 'Short code already exists' }, 409);
      }
      if (!/^[a-zA-Z0-9_-]{3,20}$/.test(code)) {
        return jsonResponse({
          error: 'Invalid short code. Use 3-20 characters: letters, numbers, underscore, or hyphen'
        }, 400);
      }
    } else {
      code = generateShortCode();
      let attempts = 0;
      while (await env.URLS.get(code) && attempts < 10) {
        code = generateShortCode();
        attempts++;
      }
    }

    await env.URLS.put(code, url);

    return jsonResponse({
      success: true,
      shortCode: code,
      url,
      shortUrl: '/' + code,
    });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

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

// API Handlers
async function handleApi(request, env, path) {
  if (path === '/api/shorten' && request.method === 'POST') {
    return handleApiShorten(request, env);
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

async function handleApiShorten(request, env) {
  try {
    const apiKey = request.headers.get('X-API-Key');
    const correctApiKey = env.API_KEY;

    if (!verifyApiKey(apiKey, correctApiKey)) {
      return jsonResponse({
        success: false,
        error: 'Invalid API key'
      }, 401);
    }

    const { url, shortCode } = await request.json();

    if (!url) {
      return jsonResponse({ success: false, error: 'URL is required' }, 400);
    }

    if (!isValidUrl(url)) {
      return jsonResponse({ success: false, error: 'Invalid URL format. URL must start with http:// or https://' }, 400);
    }

    let code = shortCode;
    if (code) {
      const existing = await env.URLS.get(code);
      if (existing) {
        return jsonResponse({ success: false, error: 'Short code already exists' }, 409);
      }
      if (!/^[a-zA-Z0-9_-]{3,20}$/.test(code)) {
        return jsonResponse({
          success: false,
          error: 'Invalid short code. Use 3-20 characters: letters, numbers, underscore, or hyphen'
        }, 400);
      }
    } else {
      code = generateShortCode();
      let attempts = 0;
      while (await env.URLS.get(code) && attempts < 10) {
        code = generateShortCode();
        attempts++;
      }
    }

    await env.URLS.put(code, url);

    const requestUrl = new URL(request.url);
    const shortUrl = requestUrl.protocol + '//' + requestUrl.host + '/' + code;

    return jsonResponse({
      success: true,
      shortCode: code,
      url,
      shortUrl,
    });
  } catch (error) {
    return jsonResponse({ success: false, error: 'Invalid request', message: error.message }, 400);
  }
}

// Redirect Handler
async function handleRedirect(env, shortCode) {
  const url = await env.URLS.get(shortCode);

  if (!url) {
    const html = '<!DOCTYPE html><html><head><title>Not Found</title><style>body{font-family:sans-serif;max-width:600px;margin:100px auto;text-align:center;}h1{color:#dc3545;}</style></head><body><h1>404 - Short URL Not Found</h1><p>The short URL "/' + shortCode + '" does not exist.</p><p><a href="/">Go to home</a></p></body></html>';
    return htmlResponse(html, 404);
  }

  return Response.redirect(url, 302);
}

// Main Worker
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
        },
      });
    }

    if (path.startsWith('/admin')) {
      return handleAdmin(request, env, path);
    }

    if (path.startsWith('/api')) {
      return handleApi(request, env, path);
    }

    if (path === '/') {
      const html = '<!DOCTYPE html><html><head><title>URL Shortener</title><style>body{font-family:sans-serif;max-width:600px;margin:100px auto;text-align:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;color:white;}h1{font-size:48px;margin-bottom:20px;}p{font-size:18px;line-height:1.6;}a{color:#fff;text-decoration:underline;}</style></head><body><h1>🔗 URL Shortener</h1><p>Welcome to the URL shortener service.</p><p><a href="/admin">Admin Panel</a></p></body></html>';
      return htmlResponse(html);
    }

    const shortCode = path.substring(1);
    if (shortCode) {
      return handleRedirect(env, shortCode);
    }

    return jsonResponse({ error: 'Not found' }, 404);
  },
};
