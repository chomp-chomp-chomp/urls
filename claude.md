# CLAUDE.md — chomp-chomp-chomp/urls

This is a Cloudflare Workers URL shortener deployed at chom.pm (or your worker subdomain).
It uses KV storage for URL mappings and has both an admin interface and a public API.

## Stack

- **Runtime**: Cloudflare Workers
- **Storage**: Cloudflare KV (binding: `URLS`)
- **Entry point**: `src/index.js`
- **Config**: `wrangler.toml`
- **Deploy**: `npm run deploy` (wraps `wrangler deploy`)
- **Dev**: `npm run dev` (local at http://localhost:8787)

## API

### Shorten a URL (public, API key auth)

```
POST /api/shorten
X-API-Key: <API_KEY>
Content-Type: application/json

{ "url": "https://...", "shortCode": "optional-custom-code" }
```

Returns: `{ "success": true, "shortCode": "abc123", "shortUrl": "https://chom.pm/abc123" }`

### Other endpoints

- `GET /{shortCode}` — redirect (public)
- `POST /admin/login` — get session token
- `POST /admin/create` — create URL (token auth)
- `GET /admin/list` — list all URLs (token auth)
- `DELETE /admin/delete/{shortCode}` — delete URL (token auth)

## Environment / Secrets

Sensitive values should be stored as Wrangler secrets, not in wrangler.toml:

```
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put API_KEY
```

## CORS Requirements

The `/api/shorten` endpoint must return CORS headers so browser-based clients
(e.g. the url-cleaner tool) can call it. Required headers on all `/api/*` responses:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-API-Key
```

OPTIONS preflight requests to `/api/*` must return 204 with the above headers.

## Related Projects

- **url-cleaner**: A React component that strips UTM/tracking params and can optionally
  call this API to shorten the cleaned URL. Lives outside this repo. It POSTs to
  `/api/shorten` with `X-API-Key` header auth.

## Key Files

- `src/index.js` — main Worker: routing, KV ops, admin auth, API handlers
- `src/admin.html` — admin UI (served as a string from the Worker)
- `src/utils.js` — shared helpers (short code generation, validation, etc.)
- `wrangler.toml` — Worker name, KV namespace binding, vars

## Deployment Notes

- Worker name: `chomp-urls`
- KV namespace binding name must stay `URLS` — changing it breaks all reads/writes
- After any wrangler.toml KV change, verify with `npx wrangler kv:namespace list`
- Tail live logs: `npm run tail`
