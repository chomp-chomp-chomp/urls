// ============================================================================
// ENHANCED CLOUDFLARE WORKER WITH CLICK TRACKING - CUSTOM THEME
// ============================================================================
// Features: Auto-copy, Copy buttons, Page titles, Click analytics, and more!
// ============================================================================

// ---------------------------------------------------------------------------
// SVG Icon library (Lucide-inspired, inline)
// ---------------------------------------------------------------------------
const icons = {
  link: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  barChart: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  globe: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  mapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  trash: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  edit: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  logOut: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  chevronDown: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  book: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  smartphone: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
  chrome: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>',
  bookmark: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
  code: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  mousePointer: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>',
  x: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  share: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  tag: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
};

// ---------------------------------------------------------------------------
// Guide page HTML
// ---------------------------------------------------------------------------
const guideHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Setup Guide - URL Shortener</title>
    <link rel="icon" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/favicon.ico">
    <link rel="apple-touch-icon" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/apple-touch-icon.png">
    <meta name="theme-color" content="#e73b42">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-bg: #fdfdfd;
            --color-text: #353535;
            --color-accent: #e73b42;
            --color-accent-hover: #d12d34;
            --color-surface: #f5f5f5;
            --color-border: #e0e0e0;
            --color-text-muted: #7d7d7d;
            --font-primary: 'Inter', sans-serif;
            --font-mono: 'Source Code Pro', monospace;
        }
        @media (prefers-color-scheme: dark) {
            :root {
                --color-bg: #231f1f;
                --color-text: #d9d4d4;
                --color-accent: #ff6b7a;
                --color-accent-hover: #ff8590;
                --color-surface: #2b2626;
                --color-border: #3b3636;
                --color-text-muted: #b9b4b4;
            }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: var(--font-primary), -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--color-bg);
            color: var(--color-text);
            line-height: 1.7;
            padding: 24px;
        }
        .container { max-width: 780px; margin: 0 auto; }
        .back-link {
            display: inline-flex; align-items: center; gap: 6px;
            color: var(--color-accent); text-decoration: none; font-weight: 500; font-size: 14px;
            margin-bottom: 24px;
        }
        .back-link:hover { color: var(--color-accent-hover); }
        .back-link svg { flex-shrink: 0; }
        h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 10px; }
        h1 svg { color: var(--color-accent); flex-shrink: 0; }
        .subtitle { color: var(--color-text-muted); margin-bottom: 32px; }
        .guide-section {
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: 10px;
            padding: 24px;
            margin-bottom: 20px;
        }
        .guide-section h2 {
            font-size: 18px; font-weight: 600; margin-bottom: 16px;
            display: flex; align-items: center; gap: 8px;
        }
        .guide-section h2 svg { color: var(--color-accent); flex-shrink: 0; }
        .guide-section h3 { font-size: 15px; font-weight: 600; margin: 16px 0 8px; }
        .guide-section p, .guide-section li { font-size: 14px; line-height: 1.7; }
        .guide-section ul, .guide-section ol { padding-left: 20px; margin: 8px 0; }
        .guide-section li { margin-bottom: 6px; }
        pre {
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            border-radius: 6px;
            padding: 14px;
            overflow-x: auto;
            font-family: var(--font-mono);
            font-size: 13px;
            line-height: 1.5;
            margin: 10px 0;
        }
        code {
            font-family: var(--font-mono);
            font-size: 13px;
            background: var(--color-bg);
            padding: 2px 5px;
            border-radius: 3px;
            border: 1px solid var(--color-border);
        }
        pre code { background: none; border: none; padding: 0; }
        .step-number {
            display: inline-flex; align-items: center; justify-content: center;
            width: 22px; height: 22px; border-radius: 50%;
            background: var(--color-accent); color: white;
            font-size: 12px; font-weight: 600; flex-shrink: 0;
        }
        .step { display: flex; gap: 10px; margin-bottom: 12px; align-items: flex-start; }
        .step p { margin: 0; }
        .note {
            background: var(--color-bg);
            border-left: 3px solid var(--color-accent);
            padding: 10px 14px;
            font-size: 13px;
            border-radius: 0 6px 6px 0;
            margin: 12px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="/admin" class="back-link">${icons.arrowLeft} Back to Admin</a>
        <h1>${icons.book} Setup Guide</h1>
        <p class="subtitle">How to shorten URLs from anywhere &mdash; your phone, browser, or code.</p>

        <div class="guide-section">
            <h2>${icons.smartphone} iOS / iPadOS Share Sheet</h2>
            <p>Add a <strong>Shorten URL</strong> action to the iOS Share Sheet using Apple Shortcuts.</p>

            <h3>Build the Shortcut</h3>
            <div class="step"><span class="step-number">1</span><p>Open the <strong>Shortcuts</strong> app and tap <strong>+</strong>. Name it <strong>Shorten URL</strong>.</p></div>
            <div class="step"><span class="step-number">2</span><p>Add <strong>Receive What's Shared</strong>. Set accepted types to <em>URLs</em> and <em>Safari Web Pages</em>.</p></div>
            <div class="step"><span class="step-number">3</span><p>Add <strong>Get Contents of URL</strong>. Set URL to <code>https://chom.pm/api/shorten</code>, Method to <code>POST</code>, Request Body to <code>JSON</code>. Add key <code>url</code> with value <em>Shortcut Input</em>. Add headers: <code>Content-Type</code> = <code>application/json</code> and <code>X-API-Key</code> = your API key.</p></div>
            <div class="step"><span class="step-number">4</span><p>Add <strong>Get Dictionary Value</strong>. Key: <code>shortUrl</code>, Dictionary: <em>Contents of URL</em>.</p></div>
            <div class="step"><span class="step-number">5</span><p>Add <strong>Copy to Clipboard</strong> with input set to <em>Dictionary Value</em>.</p></div>
            <div class="step"><span class="step-number">6</span><p>(Optional) Add <strong>Show Notification</strong> &mdash; Title: <em>URL Shortened</em>, Body: <em>Dictionary Value</em>.</p></div>

            <h3>Enable Share Sheet</h3>
            <p>Open the shortcut details and enable <strong>Show in Share Sheet</strong>. Under Share Sheet types keep <em>URLs</em> and <em>Safari Web Pages</em>.</p>

            <h3>Usage</h3>
            <p>Tap Share on any page &rarr; choose <strong>Shorten URL</strong> &rarr; the short link is copied to your clipboard.</p>

            <div class="note"><strong>Tip:</strong> To allow custom short codes, add an <strong>Ask for Input</strong> action before step 3 and pass the result as the <code>shortCode</code> JSON key.</div>

            <div class="note"><strong>Titles:</strong> To set a title, add <strong>Get Name of Shortcut Input</strong> before step 3 to get the page title. Pass it as the <code>title</code> JSON key alongside <code>url</code>. You can also add an <strong>Ask for Input</strong> to let yourself edit the title before saving.</div>
        </div>

        <div class="guide-section">
            <h2>${icons.chrome} Chrome Extension</h2>
            <p>Install the bundled extension for one-click shortening, context menus, and keyboard shortcuts.</p>

            <h3>Install</h3>
            <div class="step"><span class="step-number">1</span><p>Open <code>chrome://extensions</code> in Chrome.</p></div>
            <div class="step"><span class="step-number">2</span><p>Enable <strong>Developer mode</strong> (toggle in top-right).</p></div>
            <div class="step"><span class="step-number">3</span><p>Click <strong>Load unpacked</strong> and select the <code>chrome-extension/</code> folder from this repo.</p></div>
            <div class="step"><span class="step-number">4</span><p>Pin the extension in the toolbar. Click it, open <strong>Settings</strong>, paste your API key, and save.</p></div>

            <h3>Usage</h3>
            <ul>
                <li><strong>Click the toolbar icon</strong> &mdash; shortens the current page, copies to clipboard.</li>
                <li><strong>Right-click a page</strong> &rarr; <em>Shorten this URL</em>.</li>
                <li><strong>Right-click any link</strong> &rarr; shortens that link directly.</li>
                <li><strong>Keyboard shortcut:</strong> <code>Ctrl+Shift+S</code> (Windows/Linux) or <code>Cmd+Shift+S</code> (macOS).</li>
            </ul>
            <div class="note"><strong>Titles:</strong> The extension automatically sends the page title. You can edit it in the popup before shortening, or later from the admin panel.</div>
        </div>

        <div class="guide-section">
            <h2>${icons.bookmark} Browser Bookmarklet</h2>
            <p>A universal one-click solution that works in any browser &mdash; no install required.</p>

            <h3>Setup</h3>
            <div class="step"><span class="step-number">1</span><p>Copy the code below and <strong>replace <code>YOUR-API-KEY</code></strong> with your actual key.</p></div>
            <pre><code>javascript:(function(){const url=window.location.href;const title=document.title;const apiKey='YOUR-API-KEY';const domain='https://chom.pm';fetch(domain+'/api/shorten',{method:'POST',headers:{'X-API-Key':apiKey,'Content-Type':'application/json'},body:JSON.stringify({url:url,title:title})}).then(r=>r.json()).then(d=>{if(d.success){navigator.clipboard.writeText(d.shortUrl);alert('Short URL copied!\\n'+d.shortUrl);}else{alert('Error: '+d.error);}}).catch(e=>alert('Network error: '+e.message));})();</code></pre>
            <div class="step"><span class="step-number">2</span><p>Create a new bookmark in your browser. Set the <strong>Name</strong> to <em>Shorten URL</em> and paste the code as the <strong>URL</strong>.</p></div>

            <h3>Usage</h3>
            <p>Navigate to any page and click the bookmark. The short URL is created and copied to your clipboard.</p>

            <div class="note"><strong>Custom codes &amp; titles:</strong> The bookmarklet automatically captures the page title. For a version that also prompts for a custom short code, add <code>const code=prompt('Custom code (blank for random):');</code> and include <code>shortCode:code</code> in the JSON body. You can edit titles later from the admin panel.</div>

            <div class="note"><strong>Security:</strong> Your API key is visible in the bookmark. This is fine for personal use on your own devices &mdash; don't share the bookmark itself.</div>
        </div>

        <div class="guide-section">
            <h2>${icons.code} API</h2>
            <p>Shorten URLs programmatically from any language or tool.</p>

            <h3>Endpoint</h3>
            <pre><code>POST https://chom.pm/api/shorten</code></pre>

            <h3>Headers</h3>
            <pre><code>Content-Type: application/json
X-API-Key: YOUR-API-KEY</code></pre>

            <h3>Request body</h3>
            <pre><code>{
  "url": "https://example.com/long/url",
  "title": "Optional page title",
  "shortCode": "optional-custom-code"
}</code></pre>

            <h3>Response</h3>
            <pre><code>{
  "success": true,
  "shortCode": "abc123",
  "url": "https://example.com/long/url",
  "title": "Optional page title",
  "shortUrl": "https://chom.pm/abc123"
}</code></pre>

            <h3>cURL example</h3>
            <pre><code>curl -X POST https://chom.pm/api/shorten \\
  -H "X-API-Key: YOUR-API-KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com"}'</code></pre>

            <h3>JavaScript example</h3>
            <pre><code>const res = await fetch('https://chom.pm/api/shorten', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR-API-KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ url: 'https://example.com' }),
});
const data = await res.json();
console.log(data.shortUrl);</code></pre>

            <h3>Python example</h3>
            <pre><code>import requests

resp = requests.post(
    'https://chom.pm/api/shorten',
    headers={
        'X-API-Key': 'YOUR-API-KEY',
        'Content-Type': 'application/json',
    },
    json={'url': 'https://example.com'},
)
print(resp.json()['shortUrl'])</code></pre>

            <h3>Shell alias</h3>
            <pre><code># Add to ~/.bashrc or ~/.zshrc
shorten() {
  curl -s -X POST https://chom.pm/api/shorten \\
    -H "X-API-Key: YOUR-API-KEY" \\
    -H "Content-Type: application/json" \\
    -d "{\\\"url\\\":\\\"$1\\\"}" | jq -r '.shortUrl'
}
# Usage:  shorten "https://example.com"</code></pre>

            <div class="note"><strong>Parameters:</strong> <code>url</code> (required) must start with <code>http://</code> or <code>https://</code>. <code>title</code> (optional) a label for the URL, up to 200 characters. <code>shortCode</code> (optional) must be 3-20 characters: letters, numbers, underscore, or hyphen.</div>
        </div>
    </div>
</body>
</html>`;

// ---------------------------------------------------------------------------
// Admin panel HTML
// ---------------------------------------------------------------------------
const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL Shortener - Admin</title>

    <!-- Favicons and Touch Icons -->
    <link rel="icon" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/favicon.ico">
    <link rel="apple-touch-icon" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/apple-touch-icon.png">
    <link rel="icon" sizes="192x192" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/icon-192.png">
    <link rel="icon" sizes="512x512" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/icon-512.png">
    <meta name="theme-color" content="#e73b42">

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
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        h1 svg { color: var(--color-accent); }

        .auth-section, .admin-section { display: none; }
        .auth-section.active, .admin-section.active { display: block; }

        .form-group { margin-bottom: var(--spacing-md); }

        label {
            display: block;
            margin-bottom: var(--spacing-xs);
            color: var(--color-text);
            font-weight: 500;
        }

        input[type="password"], input[type="url"], input[type="text"] {
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
            margin-bottom: 6px;
        }

        .url-info { flex: 1; min-width: 0; }

        .short-url-row {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 4px;
        }

        .short-url {
            color: var(--color-accent);
            font-weight: 600;
            text-decoration: none;
        }

        .short-url:hover { color: var(--color-accent-hover); }

        .long-url {
            color: var(--color-text-muted);
            font-size: 13px;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .url-meta {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            color: var(--color-text-light);
            margin-top: 4px;
        }

        .url-meta svg { flex-shrink: 0; }

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
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }

        .url-actions {
            display: flex;
            gap: var(--spacing-xs);
            flex-shrink: 0;
            align-items: center;
        }

        .icon-btn {
            padding: 7px 12px;
            width: auto;
            font-size: 13px;
            display: inline-flex;
            align-items: center;
            gap: 5px;
        }

        .copy-btn { background: var(--color-accent); }
        .copy-btn:hover { background: var(--color-accent-hover); }
        .copy-btn.copied { background: #28a745; }

        .edit-btn { background: var(--color-text-muted); }
        .edit-btn:hover { background: var(--color-text); }

        .delete-btn { background: var(--color-text-muted); }
        .delete-btn:hover { background: var(--color-text); }

        .message {
            padding: var(--spacing-sm);
            border-radius: 6px;
            margin-bottom: var(--spacing-md);
            display: none;
            border: 1px solid var(--color-border);
        }

        .message.success {
            background: #d4edda; color: #155724; border-color: #c3e6cb; display: block;
        }
        @media (prefers-color-scheme: dark) {
            .message.success { background: #1e4620; color: #9fe5a4; border-color: #2d5a2f; }
        }
        .message.error {
            background: #f8d7da; color: #721c24; border-color: #f5c6cb; display: block;
        }
        @media (prefers-color-scheme: dark) {
            .message.error { background: #4a1f22; color: #f5b7bc; border-color: #5a2f32; }
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

        .stats-item { text-align: center; }

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

        .bulk-bar {
            display: none;
            align-items: center;
            gap: 12px;
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            padding: 10px 14px;
            border-radius: 8px;
            margin-bottom: 12px;
        }

        .bulk-bar.active { display: flex; }

        .bulk-bar span { font-size: 14px; font-weight: 500; flex: 1; }

        .bulk-bar button {
            width: auto;
            padding: 6px 14px;
            font-size: 13px;
        }

        .bulk-delete-btn { background: #dc3545; }
        .bulk-delete-btn:hover { background: #c82333; }

        .bulk-cancel-btn { background: var(--color-text-muted); }
        .bulk-cancel-btn:hover { background: var(--color-text); }

        .url-checkbox {
            width: 18px;
            height: 18px;
            accent-color: var(--color-accent);
            cursor: pointer;
            flex-shrink: 0;
            margin-right: 6px;
        }

        .url-item-row {
            display: flex;
            align-items: flex-start;
        }

        .url-item-content { flex: 1; min-width: 0; }

        .show-more-btn {
            width: 100%;
            background: var(--color-bg);
            color: var(--color-accent);
            border: 1px solid var(--color-border);
            padding: 12px;
            font-size: 14px;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .show-more-btn:hover {
            background: var(--color-sidebar-bg);
            transform: none;
        }

        .edit-inline {
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }

        .edit-inline input {
            width: 140px;
            padding: 3px 8px;
            font-size: 14px;
            font-weight: 600;
            border: 2px solid var(--color-accent);
            border-radius: 4px;
            background: var(--color-bg);
            color: var(--color-accent);
        }

        .edit-inline button {
            width: auto;
            padding: 4px 8px;
            font-size: 12px;
        }

        .save-edit-btn { background: #28a745; }
        .save-edit-btn:hover { background: #218838; }

        .cancel-edit-btn { background: var(--color-text-muted); }
        .cancel-edit-btn:hover { background: var(--color-text); }

        .footer-actions {
            display: flex;
            gap: 10px;
            margin-top: var(--spacing-md);
        }

        .footer-actions button { flex: 1; }

        .guide-btn {
            background: var(--color-bg);
            color: var(--color-accent);
            border: 1px solid var(--color-border);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .guide-btn:hover {
            background: var(--color-sidebar-bg);
            transform: translateY(-1px);
        }

        .logout-btn {
            background: var(--color-text-muted);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .logout-btn:hover { background: var(--color-text); }

        .list-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .list-header h2 {
            color: var(--color-text);
            font-weight: 600;
        }

        .select-all-label {
            font-size: 13px;
            color: var(--color-text-muted);
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
            user-select: none;
        }

        h2 { color: var(--color-text); font-weight: 600; }

        .search-bar {
            position: relative;
            margin-bottom: 15px;
        }

        .search-bar input {
            width: 100%;
            padding: 10px 12px 10px 36px;
            border: 2px solid var(--color-border);
            border-radius: 6px;
            font-size: 14px;
            font-family: var(--font-primary), var(--font-fallback), sans-serif;
            background: var(--color-bg);
            color: var(--color-text);
            transition: border-color 0.3s;
        }

        .search-bar input:focus {
            outline: none;
            border-color: var(--color-accent);
        }

        .search-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--color-text-light);
            display: flex;
            pointer-events: none;
        }

        .url-title {
            font-weight: 600;
            font-size: 14px;
            color: var(--color-text);
            margin-bottom: 2px;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .url-title svg { color: var(--color-text-muted); flex-shrink: 0; }

        .url-title-text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .no-title {
            color: var(--color-text-light);
            font-style: italic;
            font-weight: 400;
        }

        .title-edit-btn {
            background: none;
            border: none;
            color: var(--color-text-light);
            cursor: pointer;
            padding: 2px;
            width: auto;
            display: inline-flex;
            align-items: center;
        }

        .title-edit-btn:hover {
            color: var(--color-accent);
            background: none;
            transform: none;
        }

        .title-edit-inline {
            display: flex;
            align-items: center;
            gap: 4px;
            margin-bottom: 2px;
        }

        .title-edit-inline input {
            flex: 1;
            padding: 3px 8px;
            font-size: 14px;
            font-weight: 500;
            border: 2px solid var(--color-accent);
            border-radius: 4px;
            background: var(--color-bg);
            color: var(--color-text);
        }

        .title-edit-inline button {
            width: auto;
            padding: 4px 8px;
            font-size: 12px;
        }

        .search-match {
            background: rgba(231, 59, 66, 0.15);
            border-radius: 2px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${icons.link} URL Shortener Admin</h1>

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
                    <label for="title">Title (optional)</label>
                    <input type="text" id="title" placeholder="e.g. Team standup notes" maxlength="200">
                </div>
                <div class="form-group">
                    <label for="shortCode">Custom Short Code (optional)</label>
                    <input type="text" id="shortCode" placeholder="Leave blank for random code">
                </div>
                <button type="submit">Create Short URL</button>
            </form>

            <div class="url-list">
                <div class="search-bar">
                    <span class="search-icon">${icons.search}</span>
                    <input type="text" id="searchInput" placeholder="Search titles and URLs..." oninput="applySearch()">
                </div>
                <div class="list-header">
                    <h2>Your Short URLs</h2>
                    <label class="select-all-label"><input type="checkbox" id="selectAll" class="url-checkbox"> Select all</label>
                </div>
                <div id="bulkBar" class="bulk-bar">
                    <span id="selectedCount">0 selected</span>
                    <button class="bulk-delete-btn icon-btn" onclick="bulkDelete()">${icons.trash} Delete selected</button>
                    <button class="bulk-cancel-btn icon-btn" onclick="clearSelection()">${icons.x} Cancel</button>
                </div>
                <div id="urlsList"></div>
                <div id="showMoreWrap" style="display:none; margin-top:10px;">
                    <button class="show-more-btn" onclick="showMore()">${icons.chevronDown} <span id="showMoreLabel">Show more</span></button>
                </div>
            </div>

            <div class="footer-actions">
                <button class="guide-btn" onclick="window.location.href='/admin/guide'">${icons.book} Setup Guide</button>
                <button class="logout-btn" onclick="logout()">${icons.logOut} Logout</button>
            </div>
        </div>
    </div>

    <script>
        let authToken = '';
        let allUrls = [];
        let filteredUrls = [];
        let searchQuery = '';
        let displayLimit = 50;
        const PAGE_SIZE = 50;
        const selectedCodes = new Set();

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
            const title = document.getElementById('title').value.trim() || undefined;
            const shortCode = document.getElementById('shortCode').value || undefined;
            try {
                const response = await fetch('/admin/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ url: longUrl, title, shortCode })
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
                    if (response.status === 401) { showMessage('message', 'Session expired. Please login again.', 'error'); logout(); return; }
                    showMessage('message', data.error || 'Failed to create URL', 'error');
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
            }
        });

        document.getElementById('selectAll').addEventListener('change', function() {
            const visible = filteredUrls.slice(0, displayLimit);
            if (this.checked) {
                visible.forEach(u => selectedCodes.add(u.shortCode));
            } else {
                selectedCodes.clear();
            }
            renderList();
            updateBulkBar();
        });

        async function loadUrls() {
            try {
                const response = await fetch('/admin/list', { headers: { 'Authorization': authToken } });
                if (!response.ok) {
                    if (response.status === 401) { showMessage('message', 'Session expired. Please login again.', 'error'); logout(); return; }
                    throw new Error('Failed to load URLs');
                }
                const data = await response.json();

                const urlsWithData = await Promise.all(data.urls.map(async item => {
                    const stats = await fetchStats(item.shortCode);
                    return { ...item, stats };
                }));

                allUrls = urlsWithData;
                applySearch();
                displayLimit = PAGE_SIZE;
                selectedCodes.clear();
                document.getElementById('selectAll').checked = false;

                document.getElementById('urlCount').textContent = allUrls.length;
                const totalClicks = allUrls.reduce((sum, item) => sum + (item.stats?.clicks || 0), 0);
                document.getElementById('totalClicks').textContent = totalClicks.toLocaleString();

                document.getElementById('authSection').classList.remove('active');
                document.getElementById('adminSection').classList.add('active');

                renderList();
                updateBulkBar();
            } catch (error) {
                showMessage('message', 'Failed to load URLs', 'error');
            }
        }

        async function fetchStats(shortCode) {
            try {
                const response = await fetch('/admin/stats/' + shortCode, { headers: { 'Authorization': authToken } });
                return await response.json();
            } catch (err) {
                return null;
            }
        }

        function applySearch() {
            searchQuery = (document.getElementById('searchInput') ? document.getElementById('searchInput').value : '').toLowerCase().trim();
            if (!searchQuery) {
                filteredUrls = allUrls;
            } else {
                filteredUrls = allUrls.filter(item => {
                    const t = (item.title || '').toLowerCase();
                    const u = (item.url || '').toLowerCase();
                    const sc = (item.shortCode || '').toLowerCase();
                    return t.includes(searchQuery) || u.includes(searchQuery) || sc.includes(searchQuery);
                });
            }
            displayLimit = PAGE_SIZE;
            renderList();
            updateBulkBar();
        }

        function renderList() {
            const urlsList = document.getElementById('urlsList');
            if (allUrls.length === 0) {
                urlsList.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 20px;">No URLs yet. Create your first short URL!</p>';
                document.getElementById('showMoreWrap').style.display = 'none';
                return;
            }

            if (filteredUrls.length === 0 && searchQuery) {
                urlsList.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 20px;">No URLs match your search.</p>';
                document.getElementById('showMoreWrap').style.display = 'none';
                return;
            }

            const visible = filteredUrls.slice(0, displayLimit);

            urlsList.innerHTML = visible.map(item => {
                const checked = selectedCodes.has(item.shortCode) ? 'checked' : '';
                let statsHtml = '';
                if (item.stats && item.stats.clicks > 0) {
                    const lastClicked = item.stats.lastClicked ? formatTimeAgo(item.stats.lastClicked) : 'Never';
                    const topReferrer = item.stats.topReferrer || 'Direct';
                    const topCountry = item.stats.topCountry || 'Unknown';
                    statsHtml = '<div class="url-stats">' +
                        '<div class="stat-row">' +
                            '<div class="stat-item"><span class="stat-label">${icons.barChart} Clicks:</span> ' + item.stats.clicks + '</div>' +
                            '<div class="stat-item"><span class="stat-label">${icons.clock} Last:</span> ' + lastClicked + '</div>' +
                        '</div>' +
                        '<div class="stat-row">' +
                            '<div class="stat-item"><span class="stat-label">${icons.globe} Top Country:</span> ' + topCountry + '</div>' +
                            '<div class="stat-item"><span class="stat-label">${icons.mapPin} Top Referrer:</span> ' + topReferrer + '</div>' +
                        '</div>' +
                    '</div>';
                }

                const createdHtml = item.createdAt
                    ? '<div class="url-meta">${icons.calendar} ' + formatDate(item.createdAt) + '</div>'
                    : '';

                const titleDisplay = item.title
                    ? '<span class="url-title-text">' + escapeHtml(item.title) + '</span>'
                    : '<span class="url-title-text no-title">No title</span>';

                const titleHtml = '<div class="url-title" id="title-' + item.shortCode + '">${icons.tag} ' + titleDisplay +
                    ' <button class="title-edit-btn" onclick="startTitleEdit(\\'' + item.shortCode + '\\', ' + (item.title ? '\\'' + escapeAttr(item.title) + '\\'' : 'null') + ')" title="Edit title">${icons.edit}</button>' +
                    '</div>';

                return '<div class="url-item"><div class="url-item-row">' +
                    '<input type="checkbox" class="url-checkbox" data-code="' + item.shortCode + '" ' + checked + ' onchange="toggleSelect(\\'' + item.shortCode + '\\', this.checked)">' +
                    '<div class="url-item-content">' +
                        '<div class="url-header">' +
                            '<div class="url-info">' +
                                titleHtml +
                                '<div class="short-url-row" id="row-' + item.shortCode + '">' +
                                    '<a href="/' + item.shortCode + '" class="short-url" target="_blank">/' + item.shortCode + '</a>' +
                                    '<button class="edit-btn icon-btn" onclick="startEdit(\\'' + item.shortCode + '\\')" title="Edit short code">${icons.edit}</button>' +
                                '</div>' +
                                '<div class="long-url">' + escapeHtml(item.url) + '</div>' +
                                createdHtml +
                            '</div>' +
                            '<div class="url-actions">' +
                                '<button class="copy-btn icon-btn" onclick="copyUrl(\\'' + item.shortCode + '\\', this)">${icons.copy} Copy</button>' +
                                '<button class="delete-btn icon-btn" onclick="deleteUrl(\\'' + item.shortCode + '\\')">${icons.trash}</button>' +
                            '</div>' +
                        '</div>' +
                        statsHtml +
                    '</div>' +
                '</div></div>';
            }).join('');

            const remaining = filteredUrls.length - displayLimit;
            const wrap = document.getElementById('showMoreWrap');
            if (remaining > 0) {
                wrap.style.display = 'block';
                document.getElementById('showMoreLabel').textContent = 'Show more (' + remaining + ' remaining)';
            } else {
                wrap.style.display = 'none';
            }
        }

        function showMore() {
            displayLimit += PAGE_SIZE;
            renderList();
        }

        function toggleSelect(code, checked) {
            if (checked) selectedCodes.add(code); else selectedCodes.delete(code);
            updateBulkBar();
        }

        function updateBulkBar() {
            const bar = document.getElementById('bulkBar');
            if (selectedCodes.size > 0) {
                bar.classList.add('active');
                document.getElementById('selectedCount').textContent = selectedCodes.size + ' selected';
            } else {
                bar.classList.remove('active');
            }
        }

        function clearSelection() {
            selectedCodes.clear();
            document.getElementById('selectAll').checked = false;
            renderList();
            updateBulkBar();
        }

        async function bulkDelete() {
            if (selectedCodes.size === 0) return;
            if (!confirm('Delete ' + selectedCodes.size + ' short URL(s)?')) return;
            try {
                const response = await fetch('/admin/bulk-delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ codes: Array.from(selectedCodes) })
                });
                if (response.ok) {
                    const data = await response.json();
                    showMessage('message', data.deleted + ' URL(s) deleted', 'success');
                    selectedCodes.clear();
                    document.getElementById('selectAll').checked = false;
                    loadUrls();
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    const data = await response.json();
                    showMessage('message', data.error || 'Bulk delete failed', 'error');
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
            }
        }

        function startEdit(shortCode) {
            const row = document.getElementById('row-' + shortCode);
            row.innerHTML = '<div class="edit-inline">' +
                '<span style="color:var(--color-text-muted);font-size:14px">/</span>' +
                '<input type="text" id="editInput-' + shortCode + '" value="' + shortCode + '" maxlength="20">' +
                '<button class="save-edit-btn icon-btn" onclick="saveEdit(\\'' + shortCode + '\\')">${icons.check}</button>' +
                '<button class="cancel-edit-btn icon-btn" onclick="renderList()">${icons.x}</button>' +
            '</div>';
            const inp = document.getElementById('editInput-' + shortCode);
            inp.focus();
            inp.select();
            inp.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') { e.preventDefault(); saveEdit(shortCode); }
                if (e.key === 'Escape') { renderList(); }
            });
        }

        async function saveEdit(oldCode) {
            const newCode = document.getElementById('editInput-' + oldCode).value.trim();
            if (!newCode || newCode === oldCode) { renderList(); return; }
            try {
                const response = await fetch('/admin/edit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ oldCode, newCode })
                });
                const data = await response.json();
                if (response.ok) {
                    showMessage('message', 'Short code changed: /' + oldCode + ' → /' + newCode, 'success');
                    loadUrls();
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    showMessage('message', data.error || 'Edit failed', 'error');
                    renderList();
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
                renderList();
            }
        }

        function startTitleEdit(shortCode, currentTitle) {
            const el = document.getElementById('title-' + shortCode);
            const val = currentTitle || '';
            el.innerHTML = '<div class="title-edit-inline">' +
                '<input type="text" id="titleInput-' + shortCode + '" value="' + escapeAttr(val) + '" placeholder="Enter a title..." maxlength="200">' +
                '<button class="save-edit-btn icon-btn" onclick="saveTitleEdit(\\'' + shortCode + '\\')">${icons.check}</button>' +
                '<button class="cancel-edit-btn icon-btn" onclick="renderList()">${icons.x}</button>' +
            '</div>';
            const inp = document.getElementById('titleInput-' + shortCode);
            inp.focus();
            inp.select();
            inp.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') { e.preventDefault(); saveTitleEdit(shortCode); }
                if (e.key === 'Escape') { renderList(); }
            });
        }

        async function saveTitleEdit(shortCode) {
            const newTitle = document.getElementById('titleInput-' + shortCode).value.trim();
            try {
                const response = await fetch('/admin/update-title', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ shortCode, title: newTitle })
                });
                const data = await response.json();
                if (response.ok) {
                    const item = allUrls.find(u => u.shortCode === shortCode);
                    if (item) item.title = newTitle || null;
                    showMessage('message', newTitle ? 'Title updated' : 'Title removed', 'success');
                    applySearch();
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    showMessage('message', data.error || 'Failed to update title', 'error');
                    renderList();
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
                renderList();
            }
        }

        function escapeAttr(str) {
            return str.replace(/&/g,'&amp;').replace(/'/g,'&#39;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
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

        function formatDate(ts) {
            const d = new Date(ts);
            const mon = d.toLocaleString('default', { month: 'short' });
            return mon + ' ' + d.getDate() + ', ' + d.getFullYear();
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
                const orig = button.innerHTML;
                button.innerHTML = '${icons.check} Copied!';
                button.classList.add('copied');
                setTimeout(() => { button.innerHTML = orig; button.classList.remove('copied'); }, 2000);
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
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
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
            setTimeout(() => { messageEl.className = 'message'; }, 5000);
        }
    </script>
</body>
</html>`;

// ---------------------------------------------------------------------------
// Utility Functions
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// KV helpers – stores JSON {url, title, createdAt} with backward compat for plain strings
// ---------------------------------------------------------------------------
function parseUrlValue(raw) {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw);
    if (obj && typeof obj.url === 'string') return obj;
  } catch (_) {
    // legacy plain-string value
  }
  return { url: raw, title: null, createdAt: null };
}

function serializeUrlValue(url, title) {
  return JSON.stringify({ url, title: title || null, createdAt: Date.now() });
}

// ---------------------------------------------------------------------------
// Click Tracking Functions
// ---------------------------------------------------------------------------
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
      return { clicks: 0, lastClicked: null, topReferrer: null, topCountry: null, referrers: {}, countries: {} };
    }

    const stats = JSON.parse(statsData);

    const topReferrer = Object.keys(stats.referrers || {})
      .sort((a, b) => stats.referrers[b] - stats.referrers[a])[0] || null;

    const topCountry = Object.keys(stats.countries || {})
      .sort((a, b) => stats.countries[b] - stats.countries[a])[0] || null;

    return {
      clicks: stats.clicks || 0,
      lastClicked: stats.lastClicked || null,
      topReferrer,
      topCountry,
      referrers: stats.referrers || {},
      countries: stats.countries || {}
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return { clicks: 0, lastClicked: null, topReferrer: null, topCountry: null, referrers: {}, countries: {} };
  }
}

// ---------------------------------------------------------------------------
// Admin Handlers
// ---------------------------------------------------------------------------
async function handleAdmin(request, env, path) {
  if (path === '/admin' || path === '/admin/') {
    return htmlResponse(adminHtml);
  }

  if (path === '/admin/guide' || path === '/admin/guide/') {
    return htmlResponse(guideHtml);
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

  if (path.startsWith('/admin/stats/')) {
    const shortCode = path.split('/admin/stats/')[1];
    return handleGetStats(env, shortCode);
  }

  if (path.startsWith('/admin/delete/') && request.method === 'DELETE') {
    const shortCode = path.split('/admin/delete/')[1];
    return handleDelete(env, shortCode);
  }

  if (path === '/admin/bulk-delete' && request.method === 'POST') {
    return handleBulkDelete(request, env);
  }

  if (path === '/admin/edit' && request.method === 'POST') {
    return handleEditShortCode(request, env);
  }

  if (path === '/admin/update-title' && request.method === 'POST') {
    return handleUpdateTitle(request, env);
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

async function handleGetStats(env, shortCode) {
  const stats = await getStats(env, shortCode);
  return jsonResponse(stats);
}

async function handleCreate(request, env) {
  try {
    const { url, title, shortCode } = await request.json();

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

    await env.URLS.put(code, serializeUrlValue(url, title));

    return jsonResponse({
      success: true,
      shortCode: code,
      url,
      title: title || null,
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
          const raw = await env.URLS.get(key.name);
          const parsed = parseUrlValue(raw);
          return {
            shortCode: key.name,
            url: parsed.url,
            title: parsed.title || null,
            createdAt: parsed.createdAt,
          };
        })
    );

    // Sort newest first (entries without createdAt go to the end)
    urls.sort((a, b) => {
      if (a.createdAt && b.createdAt) return b.createdAt - a.createdAt;
      if (a.createdAt) return -1;
      if (b.createdAt) return 1;
      return 0;
    });

    return jsonResponse({ urls });
  } catch (error) {
    return jsonResponse({ error: 'Failed to list URLs' }, 500);
  }
}

async function handleDelete(env, shortCode) {
  if (!shortCode) {
    return jsonResponse({ error: 'Short code required' }, 400);
  }

  const raw = await env.URLS.get(shortCode);
  if (!raw) {
    return jsonResponse({ error: 'Short URL not found' }, 404);
  }

  await env.URLS.delete(shortCode);
  await env.URLS.delete('stats:' + shortCode);
  return jsonResponse({ success: true });
}

async function handleBulkDelete(request, env) {
  try {
    const { codes } = await request.json();
    if (!Array.isArray(codes) || codes.length === 0) {
      return jsonResponse({ error: 'No codes provided' }, 400);
    }

    let deleted = 0;
    await Promise.all(codes.map(async (code) => {
      const raw = await env.URLS.get(code);
      if (raw) {
        await env.URLS.delete(code);
        await env.URLS.delete('stats:' + code);
        deleted++;
      }
    }));

    return jsonResponse({ success: true, deleted });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

async function handleEditShortCode(request, env) {
  try {
    const { oldCode, newCode } = await request.json();

    if (!oldCode || !newCode) {
      return jsonResponse({ error: 'Both oldCode and newCode are required' }, 400);
    }

    if (!/^[a-zA-Z0-9_-]{3,20}$/.test(newCode)) {
      return jsonResponse({
        error: 'Invalid short code. Use 3-20 characters: letters, numbers, underscore, or hyphen'
      }, 400);
    }

    const raw = await env.URLS.get(oldCode);
    if (!raw) {
      return jsonResponse({ error: 'Original short code not found' }, 404);
    }

    const existingNew = await env.URLS.get(newCode);
    if (existingNew) {
      return jsonResponse({ error: 'New short code already exists' }, 409);
    }

    // Copy URL data to new key
    await env.URLS.put(newCode, raw);

    // Copy stats if they exist
    const statsKey = 'stats:' + oldCode;
    const statsData = await env.URLS.get(statsKey);
    if (statsData) {
      await env.URLS.put('stats:' + newCode, statsData);
      await env.URLS.delete(statsKey);
    }

    // Delete old key
    await env.URLS.delete(oldCode);

    return jsonResponse({ success: true, oldCode, newCode });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

async function handleUpdateTitle(request, env) {
  try {
    const { shortCode, title } = await request.json();

    if (!shortCode) {
      return jsonResponse({ error: 'shortCode is required' }, 400);
    }

    const raw = await env.URLS.get(shortCode);
    if (!raw) {
      return jsonResponse({ error: 'Short code not found' }, 404);
    }

    const parsed = parseUrlValue(raw);
    parsed.title = title || null;
    if (!parsed.createdAt) parsed.createdAt = Date.now();

    await env.URLS.put(shortCode, JSON.stringify(parsed));

    return jsonResponse({ success: true, shortCode, title: parsed.title });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

// ---------------------------------------------------------------------------
// API Handlers
// ---------------------------------------------------------------------------
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

    const { url, title, shortCode } = await request.json();

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

    await env.URLS.put(code, serializeUrlValue(url, title));

    const requestUrl = new URL(request.url);
    const shortUrl = requestUrl.protocol + '//' + requestUrl.host + '/' + code;

    return jsonResponse({
      success: true,
      shortCode: code,
      url,
      title: title || null,
      shortUrl,
    });
  } catch (error) {
    return jsonResponse({ success: false, error: 'Invalid request', message: error.message }, 400);
  }
}

// ---------------------------------------------------------------------------
// Redirect Handler with Click Tracking
// ---------------------------------------------------------------------------
async function handleRedirect(env, shortCode, request) {
  const raw = await env.URLS.get(shortCode);

  if (!raw) {
    const html = '<!DOCTYPE html><html><head><title>Not Found</title><style>body{font-family:Inter,sans-serif;max-width:600px;margin:100px auto;text-align:center;color:#353535;}h1{color:#e73b42;}</style></head><body><h1>404 - Short URL Not Found</h1><p>The short URL "/' + shortCode + '" does not exist.</p><p><a href="/" style="color:#e73b42;">Go to home</a></p></body></html>';
    return htmlResponse(html, 404);
  }

  const parsed = parseUrlValue(raw);
  await trackClick(env, shortCode, request);
  return Response.redirect(parsed.url, 302);
}

// ---------------------------------------------------------------------------
// Main Worker
// ---------------------------------------------------------------------------
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
      const html = '<!DOCTYPE html><html><head><title>URL Shortener</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet"><style>body{font-family:Inter,sans-serif;max-width:600px;margin:100px auto;text-align:center;background:#fdfdfd;color:#353535;padding:20px;}h1{font-size:48px;margin-bottom:20px;font-weight:700;}p{font-size:18px;line-height:1.7;}a{color:#e73b42;text-decoration:none;font-weight:600;}a:hover{color:#d12d34;}@media(prefers-color-scheme:dark){body{background:#231f1f;color:#d9d4d4;}a{color:#ff6b7a;}a:hover{color:#ff8590;}}</style></head><body><h1>' + icons.link + ' URL Shortener</h1><p>Welcome to the URL shortener service.</p><p><a href="/admin">Admin Panel</a></p></body></html>';
      return htmlResponse(html);
    }

    const shortCode = path.substring(1);
    if (shortCode) {
      return handleRedirect(env, shortCode, request);
    }

    return jsonResponse({ error: 'Not found' }, 404);
  },
};
