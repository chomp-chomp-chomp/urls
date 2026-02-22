# iPhone Share Sheet Shortcut (URL Shortener)

Use Apple Shortcuts to add **Shorten URL** directly to the iOS Share Sheet.

## What you get

- Share from Safari/Chrome/most apps
- URL is shortened through your Worker API
- Short URL is copied to clipboard
- Optional notification with the final short URL

---

## Before you start

You need:

- Your API endpoint (default in this project: `https://chom.pm/api/shorten`)
- Your `API_KEY` value from Worker secrets/vars

---

## Build the shortcut (recommended flow)

### 1) Create shortcut shell

1. Open **Shortcuts** on iPhone
2. Tap **+**
3. Tap shortcut name and rename to **Shorten URL**

### 2) Add actions

Add these actions in order.

#### Action A — Receive input from Share Sheet

- Action: **Receive What's Shared** (or older iOS wording: *Receive URLs from Share Sheet*)
- Set accepted types to:
  - **URLs**
  - **Safari Web Pages**

#### Action B — Get Contents of URL

- Action: **Get Contents of URL**
- URL: `https://chom.pm/api/shorten`
- Method: `POST`
- Request Body: `JSON`
- JSON key/value:
  - `url` → **Shortcut Input**
- Headers:
  - `Content-Type` = `application/json`
  - `X-API-Key` = `YOUR_API_KEY`

#### Action C — Get Dictionary Value

- Action: **Get Dictionary Value**
- Key: `shortUrl`
- Dictionary: **Contents of URL**

#### Action D — Copy to Clipboard

- Action: **Copy to Clipboard**
- Input: **Dictionary Value**

#### Action E — Show Notification (optional but useful)

- Action: **Show Notification**
- Title: `URL Shortened`
- Body: **Dictionary Value**

---

## Shortcut settings

1. Open shortcut **Details** (ⓘ or settings icon depending on iOS version)
2. Enable **Show in Share Sheet**
3. Under Share Sheet types, keep:
   - `URLs`
   - `Safari Web Pages`
4. Tap **Done**

---

## Test it

1. Open any page in Safari
2. Tap **Share**
3. Choose **Shorten URL**
4. Wait for completion notification
5. Paste anywhere to confirm clipboard contains the short URL

---

## Optional: prompt for custom short code

If you want custom aliases sometimes:

1. Add **Ask for Input** before “Get Contents of URL”
2. Prompt text: `Custom short code (optional)`
3. In JSON body for “Get Contents of URL”, add:
   - `shortCode` → **Provided Input**

If left blank, your API will still generate a random code.

---

## Troubleshooting

### “The request failed”

- Re-check endpoint URL and method (`POST`)
- Confirm `Content-Type` and `X-API-Key` headers are present
- Confirm API key value has no extra spaces

### Shortcut does not appear in Share Sheet

- Verify **Show in Share Sheet** is enabled
- Verify accepted types include `URLs`
- Force close and reopen app where you’re sharing from

### API returns error JSON

- Test API separately with curl:

```bash
curl -X POST https://chom.pm/api/shorten \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com"}'
```

If this fails, fix Worker/API key first, then retest shortcut.
