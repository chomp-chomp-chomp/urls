// ============================================================================
// ENHANCED CLOUDFLARE WORKER WITH CLICK TRACKING - CUSTOM THEME
// ============================================================================
// Features: Auto-copy, Copy buttons, Page titles, Click analytics, and more!
// ============================================================================

const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL Shortener - Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-bg: #fdfdfd;
            --color-text: #353535;
            --color-accent: #e73b42;
            --color-accent-hover: #d12d34;
            --color-sidebar-bg: #f5f5f5;
            --color-border: #e0e0e0;
            --color-text-muted: #7d7d7d;
            --color-text-light: #9d9d9d;
            --spacing-xs: 8px;
            --spacing-sm: 12px;
            --spacing-md: 20px;
            --spacing-lg: 30px;
            --spacing-xl: 40px;
            --font-primary: 'Inter', sans-serif;
            --font-fallback: 'Source Sans 3', sans-serif;
            --line-height-base: 1.7;
            --line-height-tight: 1.3;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --color-bg: #231f1f;
                --color-text: #d9d4d4;
                --color-accent: #ff6b7a;
                --color-accent-hover: #ff8590;
                --color-sidebar-bg: #2b2626;
                --color-border: #3b3636;
                --color-text-muted: #b9b4b4;
                --color-text-light: #948f8f;
            }
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: var(--font-primary), var(--font-fallback), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--color-bg);
            color: var(--color-text);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: var(--spacing-md);
            line-height: var(--line-height-base);
        }

        .container {
            background: var(--color-sidebar-bg);
            border-radius: 12px;
            border: 1px solid var(--color-border);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            max-width: 900px;
            width: 100%;
            padding: var(--spacing-xl);
        }

        h1 {
            color: var(--color-text);
            margin-bottom: var(--spacing-lg);
            text-align: center;
            font-weight: 700;
            line-height: var(--line-height-tight);
        }

        .auth-section, .admin-section { display: none; }
        .auth-section.active, .admin-section.active { display: block; }

        .form-group { margin-bottom: var(--spacing-md); }

        label {
            display: block;
            margin-bottom: var(--spacing-xs);
            color: var(--color-text);
            font-weight: 500;
        }

        input {
            width: 100%;
            padding: var(--spacing-sm);
            border: 2px solid var(--color-border);
            border-radius: 6px;
            font-size: 16px;
            font-family: var(--font-primary), var(--font-fallback), sans-serif;
            background: var(--color-bg);
            color: var(--color-text);
            transition: border-color 0.3s;
        }

        input:focus {
            outline: none;
            border-color: var(--color-accent);
        }

        button {
            width: 100%;
            padding: var(--spacing-sm);
            background: var(--color-accent);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            font-family: var(--font-primary), var(--font-fallback), sans-serif;
            cursor: pointer;
            transition: background 0.2s, transform 0.2s;
        }

        button:hover {
            background: var(--color-accent-hover);
            transform: translateY(-1px);
        }

        button:active { transform: translateY(0); }

        .url-list { margin-top: var(--spacing-lg); }

        .url-item {
            background: var(--color-bg);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 10px;
            border: 1px solid var(--color-border);
        }

        .url-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
        }

        .url-info { flex: 1; min-width: 0; }

        .short-url {
            color: var(--color-accent);
            font-weight: 600;
            text-decoration: none;
            display: block;
            margin-bottom: 5px;
        }

        .short-url:hover {
            color: var(--color-accent-hover);
        }

        .page-title {
            color: var(--color-text);
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 3px;
        }

        .long-url {
            color: var(--color-text-muted);
            font-size: 13px;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .url-stats {
            background: var(--color-sidebar-bg);
            padding: 10px;
            border-radius: 6px;
            border: 1px solid var(--color-border);
            margin-top: 10px;
            font-size: 13px;
            color: var(--color-text);
        }

        .stat-row {
            display: flex;
            gap: 20px;
            margin-bottom: 5px;
        }

        .stat-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .stat-label {
            font-weight: 500;
            color: var(--color-text-muted);
        }

        .url-actions {
            display: flex;
            gap: var(--spacing-xs);
            flex-shrink: 0;
        }

        .copy-btn, .delete-btn {
            padding: 8px 16px;
            width: auto;
            font-size: 14px;
        }

        .copy-btn {
            background: var(--color-accent);
        }

        .copy-btn:hover {
            background: var(--color-accent-hover);
        }

        .copy-btn.copied {
            background: #28a745;
        }

        .delete-btn {
            background: var(--color-text-muted);
        }

        .delete-btn:hover {
            background: var(--color-text);
        }

        .message {
            padding: var(--spacing-sm);
            border-radius: 6px;
            margin-bottom: var(--spacing-md);
            display: none;
            border: 1px solid var(--color-border);
        }

        .message.success {
            background: #d4edda;
            color: #155724;
            border-color: #c3e6cb;
            display: block;
        }

        @media (prefers-color-scheme: dark) {
            .message.success {
                background: #1e4620;
                color: #9fe5a4;
                border-color: #2d5a2f;
            }
        }

        .message.error {
            background: #f8d7da;
            color: #721c24;
            border-color: #f5c6cb;
            display: block;
        }

        @media (prefers-color-scheme: dark) {
            .message.error {
                background: #4a1f22;
                color: #f5b7bc;
                border-color: #5a2f32;
            }
        }

        .stats {
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: var(--spacing-md);
            text-align: center;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }

        .stats-item {
            text-align: center;
        }

        .stats-number {
            font-size: 32px;
            font-weight: 700;
            color: var(--color-accent);
        }

        .stats-label {
            color: var(--color-text-muted);
            margin-top: 5px;
            font-size: 14px;
        }

        .logout-btn {
            background: var(--color-text-muted);
            margin-top: var(--spacing-md);
        }

        .logout-btn:hover {
            background: var(--color-text);
        }

        h2 {
            color: var(--color-text);
            font-weight: 600;
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
                <div class="stats-grid">
                    <div class="stats-item">
                        <div class="stats-number" id="urlCount">0</div>
                        <div class="stats-label">Short URLs</div>
                    </div>
                    <div class="stats-item">
                        <div class="stats-number" id="totalClicks">0</div>
                        <div class="stats-label">Total Clicks</div>
                    </div>
                </div>
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
                <h2 style="margin-bottom: 15px;">Your Short URLs</h2>
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

        async function fetchStats(shortCode) {
            try {
                const response = await fetch('/admin/stats/' + shortCode, {
                    headers: { 'Authorization': authToken }
                });
                const data = await response.json();
                return data;
            } catch (err) {
                return null;
            }
        }

        async function displayUrls(urls) {
            const urlsList = document.getElementById('urlsList');
            if (urls.length === 0) {
                urlsList.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 20px;">No URLs yet. Create your first short URL!</p>';
                document.getElementById('totalClicks').textContent = '0';
                return;
            }

            const urlsWithData = await Promise.all(urls.map(async item => {
                const title = await fetchPageTitle(item.url);
                const stats = await fetchStats(item.shortCode);
                return { ...item, title, stats };
            }));

            const totalClicks = urlsWithData.reduce((sum, item) => sum + (item.stats?.clicks || 0), 0);
            document.getElementById('totalClicks').textContent = totalClicks.toLocaleString();

            urlsList.innerHTML = urlsWithData.map(item => {
                let statsHtml = '';
                if (item.stats && item.stats.clicks > 0) {
                    const lastClicked = item.stats.lastClicked ? formatTimeAgo(item.stats.lastClicked) : 'Never';
                    const topReferrer = item.stats.topReferrer || 'Direct';
                    const topCountry = item.stats.topCountry || 'Unknown';

                    statsHtml = '<div class="url-stats">' +
                        '<div class="stat-row">' +
                            '<div class="stat-item"><span class="stat-label">📊 Clicks:</span> ' + item.stats.clicks + '</div>' +
                            '<div class="stat-item"><span class="stat-label">🕐 Last:</span> ' + lastClicked + '</div>' +
                        '</div>' +
                        '<div class="stat-row">' +
                            '<div class="stat-item"><span class="stat-label">🌍 Top Country:</span> ' + topCountry + '</div>' +
                            '<div class="stat-item"><span class="stat-label">📍 Top Referrer:</span> ' + topReferrer + '</div>' +
                        '</div>' +
                    '</div>';
                }

                return '<div class="url-item">' +
                    '<div class="url-header">' +
                        '<div class="url-info">' +
                            '<a href="/' + item.shortCode + '" class="short-url" target="_blank">/' + item.shortCode + '</a>' +
                            (item.title ? '<div class="page-title">' + escapeHtml(item.title) + '</div>' : '') +
                            '<div class="long-url">' + escapeHtml(item.url) + '</div>' +
                        '</div>' +
                        '<div class="url-actions">' +
                            '<button class="copy-btn" onclick="copyUrl(\\'' + item.shortCode + '\\', this)">Copy</button>' +
                            '<button class="delete-btn" onclick="deleteUrl(\\'' + item.shortCode + '\\')">Delete</button>' +
                        '</div>' +
                    '</div>' +
                    statsHtml +
                '</div>';
            }).join('');
        }

        function formatTimeAgo(timestamp) {
            const seconds = Math.floor((Date.now() - timestamp) / 1000);
            if (seconds < 60) return seconds + 's ago';
            const minutes = Math.floor(seconds / 60);
            if (minutes < 60) return minutes + 'm ago';
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return hours + 'h ago';
            const days = Math.floor(hours / 24);
            return days + 'd ago';
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

// Click Tracking Functions
async function trackClick(env, shortCode, request) {
  try {
    const statsKey = 'stats:' + shortCode;
    const existingStats = await env.URLS.get(statsKey);

    let stats = existingStats ? JSON.parse(existingStats) : {
      clicks: 0,
      referrers: {},
      countries: {}
    };

    stats.clicks = (stats.clicks || 0) + 1;
    stats.lastClicked = Date.now();

    const referrer = request.headers.get('Referer') || 'Direct';
    const referrerDomain = referrer === 'Direct' ? 'Direct' : new URL(referrer).hostname;
    stats.referrers[referrerDomain] = (stats.referrers[referrerDomain] || 0) + 1;

    const country = request.headers.get('CF-IPCountry') || 'Unknown';
    stats.countries[country] = (stats.countries[country] || 0) + 1;

    await env.URLS.put(statsKey, JSON.stringify(stats));
  } catch (error) {
    console.error('Error tracking click:', error);
  }
}

async function getStats(env, shortCode) {
  try {
    const statsKey = 'stats:' + shortCode;
    const statsData = await env.URLS.get(statsKey);

    if (!statsData) {
      return {
        clicks: 0,
        lastClicked: null,
        topReferrer: null,
        topCountry: null,
        referrers: {},
        countries: {}
      };
    }

    const stats = JSON.parse(statsData);

    const topReferrer = Object.keys(stats.referrers || {})
      .sort((a, b) => stats.referrers[b] - stats.referrers[a])[0] || null;

    const topCountry = Object.keys(stats.countries || {})
      .sort((a, b) => stats.countries[b] - stats.countries[a])[0] || null;

    return {
      clicks: stats.clicks || 0,
      lastClicked: stats.lastClicked || null,
      topReferrer: topReferrer,
      topCountry: topCountry,
      referrers: stats.referrers || {},
      countries: stats.countries || {}
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return {
      clicks: 0,
      lastClicked: null,
      topReferrer: null,
      topCountry: null,
      referrers: {},
      countries: {}
    };
  }
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

  if (path.startsWith('/admin/stats/')) {
    const shortCode = path.split('/admin/stats/')[1];
    return handleGetStats(env, shortCode);
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

async function handleGetStats(env, shortCode) {
  const stats = await getStats(env, shortCode);
  return jsonResponse(stats);
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
      list.keys
        .filter(key => !key.name.startsWith('stats:'))
        .map(async (key) => {
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
  await env.URLS.delete('stats:' + shortCode);
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

// Redirect Handler with Click Tracking
async function handleRedirect(env, shortCode, request) {
  const url = await env.URLS.get(shortCode);

  if (!url) {
    const html = '<!DOCTYPE html><html><head><title>Not Found</title><style>body{font-family:Inter,sans-serif;max-width:600px;margin:100px auto;text-align:center;color:#353535;}h1{color:#e73b42;}</style></head><body><h1>404 - Short URL Not Found</h1><p>The short URL "/' + shortCode + '" does not exist.</p><p><a href="/" style="color:#e73b42;">Go to home</a></p></body></html>';
    return htmlResponse(html, 404);
  }

  await trackClick(env, shortCode, request);

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
      const html = '<!DOCTYPE html><html><head><title>URL Shortener</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet"><style>body{font-family:Inter,sans-serif;max-width:600px;margin:100px auto;text-align:center;background:#fdfdfd;color:#353535;padding:20px;}h1{font-size:48px;margin-bottom:20px;font-weight:700;}p{font-size:18px;line-height:1.7;}a{color:#e73b42;text-decoration:none;font-weight:600;}a:hover{color:#d12d34;}@media(prefers-color-scheme:dark){body{background:#231f1f;color:#d9d4d4;}a{color:#ff6b7a;}a:hover{color:#ff8590;}}</style></head><body><h1>🔗 URL Shortener</h1><p>Welcome to the URL shortener service.</p><p><a href="/admin">Admin Panel</a></p></body></html>';
      return htmlResponse(html);
    }

    const shortCode = path.substring(1);
    if (shortCode) {
      return handleRedirect(env, shortCode, request);
    }

    return jsonResponse({ error: 'Not found' }, 404);
  },
};
