# Deployment Steps - Run These on Your Local Machine

Since you already have Wrangler authorized, run these commands in your terminal where you ran `npx wrangler login`.

## Step 1: Create KV Namespace

```bash
npx wrangler kv:namespace create "URLS"
```

**Expected output:**
```
🌀 Creating namespace with title "chomp-urls-URLS"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "URLS", id = "abc123def456..." }
```

**IMPORTANT:** Copy the `id` value (it will be a long string like "abc123def456...")

---

## Step 2: Update wrangler.toml

Open `wrangler.toml` and replace this line:
```toml
id = "template_worker_views"
```

With your new KV namespace ID:
```toml
id = "abc123def456..."  # Use the ID from Step 1
```

The section should look like:
```toml
[[kv_namespaces]]
binding = "URLS"
id = "your-actual-kv-id-here"
```

---

## Step 3: Set Admin Password (Secret)

```bash
npx wrangler secret put ADMIN_PASSWORD
```

You'll be prompted:
```
Enter a secret value:
```

**Enter a strong password** (e.g., `MySecure-Admin-Pass-2026!`)

Press Enter. You should see:
```
✨ Success! Uploaded secret ADMIN_PASSWORD
```

---

## Step 4: Set API Key (Secret)

```bash
npx wrangler secret put API_KEY
```

You'll be prompted:
```
Enter a secret value:
```

**Enter a strong API key** (e.g., `sk_live_abc123XYZ789def456GHI`)

You can generate a random one with:
```bash
# On Mac/Linux:
openssl rand -base64 32

# Or just make up a long random string
```

Press Enter. You should see:
```
✨ Success! Uploaded secret API_KEY
```

---

## Step 5: Deploy to Cloudflare

```bash
npm run deploy
```

**Expected output:**
```
Total Upload: xx.xx KiB / gzip: xx.xx KiB
Uploaded chomp-urls (x.xx sec)
Published chomp-urls (x.xx sec)
  https://chomp-urls.your-account.workers.dev
Current Deployment ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**Save the Worker URL!** It will be something like:
`https://chomp-urls.your-account.workers.dev`

---

## Step 6: Test Your Deployment

Open your browser and go to:
```
https://chomp-urls.your-account.workers.dev/admin
```

Login with the admin password you set in Step 3.

---

## Step 7: Add Custom Domain (chom.pm)

### Option A: Via Dashboard (Easiest)

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages** in the left sidebar
3. Click on your worker: **chomp-urls**
4. Click the **Settings** tab
5. Click **Domains & Routes**
6. Click **Add Custom Domain**
7. Enter: `chom.pm`
8. Click **Add Custom Domain**

Cloudflare will automatically:
- Create the necessary DNS records
- Set up SSL certificate
- Route traffic to your worker

**Done! Your URL shortener will be live at `https://chom.pm`**

### Option B: Via Wrangler (Alternative)

Add this to your `wrangler.toml`:

```toml
routes = [
  { pattern = "chom.pm/*", zone_name = "chom.pm" }
]
```

Then run:
```bash
npm run deploy
```

---

## Verification Checklist

- [ ] KV namespace created
- [ ] wrangler.toml updated with correct KV ID
- [ ] ADMIN_PASSWORD secret set
- [ ] API_KEY secret set
- [ ] Worker deployed successfully
- [ ] Worker URL works (test /admin)
- [ ] Custom domain (chom.pm) added
- [ ] Can access https://chom.pm/admin
- [ ] Can create a test short URL

---

## What to Do After Deployment

1. **Test the admin panel:** https://chom.pm/admin
2. **Create your first short URL**
3. **Test the redirect**
4. **Save your API key** somewhere safe
5. **Test the API:**

```bash
curl -X POST https://chom.pm/api/shorten \
  -H "X-API-Key: YOUR-API-KEY-FROM-STEP-4" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com", "shortCode": "test"}'
```

---

## Troubleshooting

### "Error: Code 10000: Authentication error"
- Make sure you're logged in: `npx wrangler whoami`
- If not, run: `npx wrangler login`

### "Error: KV namespace not found"
- Double-check the ID in wrangler.toml matches the ID from Step 1

### "Worker deployed but admin page shows 401"
- Make sure you set the ADMIN_PASSWORD secret (Step 3)
- Try clearing browser cache/localStorage

### "Custom domain not working"
- Make sure chom.pm nameservers are set to Cloudflare
- DNS propagation can take up to 24 hours
- Check DNS status: https://www.whatsmydns.net/#NS/chom.pm

---

## Need Help?

If you encounter any issues during deployment, let me know which step you're on and what error you're seeing!
