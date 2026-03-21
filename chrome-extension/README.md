# Chrome Extension - URL Shortener

This extension lets you shorten the current page or a link using your `/api/shorten` endpoint and auto-copy the short URL.

## ✅ What was fixed

The previous extension package failed to run in Chrome because required permissions/assets were missing. This folder now includes:

- Required manifest permissions for `storage`, `notifications`, `scripting`, and `tabs`
- A declared keyboard command (`Ctrl+Shift+S` / `Cmd+Shift+S`)
- No bundled binary icon files (uses Chrome defaults and inline SVG where needed)

## Install in Chrome (works as-is)

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select this folder: `chrome-extension/`
5. Pin **URL Shortener** in the toolbar

## First-time setup

1. Click the extension icon
2. Open **⚙️ Settings**
3. Paste your API key
4. Click **Save Settings**

## Usage

- **Toolbar popup**: opens with current page URL pre-filled
- **Right click page**: `Shorten this URL`
- **Right click link**: shortens that link directly
- **Keyboard shortcut**: `Ctrl+Shift+S` (Windows/Linux) or `Cmd+Shift+S` (macOS)

On success, the short URL is copied to your clipboard.

## Endpoint and domain

The extension currently posts to:

- `https://chmp.me/api/shorten`

If your Worker is hosted on a different domain, update both of these files:

- `manifest.json` → `host_permissions`
- `popup.js` and `background.js` → `fetch()` URL

## Create a distributable ZIP (optional)

From the repository root:

```bash
rm -f url-shortener-chrome-extension.zip
cd chrome-extension && zip -r ../url-shortener-chrome-extension.zip .
```

Then install from unpacked folder for local testing, or upload the ZIP to Chrome Web Store submission tooling.

## Troubleshooting

### Extension fails to load

- Reload it in `chrome://extensions`
- Confirm all files are present in `chrome-extension/`
- Open **Errors** on the extension card for exact line/manifest issues

### “Please set your API key”

- Open popup → Settings → paste API key → Save

### Network/API errors

- Verify API key matches Worker `API_KEY`
- Verify Worker domain is reachable
- Confirm `/api/shorten` responds with JSON

### Clipboard copy fails

- Retry from a normal HTTP/HTTPS tab (not Chrome internal pages like `chrome://`)
- Some restricted pages block injected clipboard operations
