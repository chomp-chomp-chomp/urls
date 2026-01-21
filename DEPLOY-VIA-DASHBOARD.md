# Deploy Your URL Shortener via Cloudflare Dashboard (No CLI Required!)

Everything can be done through the web browser - no terminal commands needed!

---

## Step 1: Create KV Namespace

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages** in the left sidebar
3. Click the **KV** tab at the top
4. Click **Create a namespace** button
5. Enter namespace name: `chomp-urls-URLS`
6. Click **Add**
7. **IMPORTANT:** Copy the **Namespace ID** shown (it looks like: `abc123def456...`)

---

## Step 2: Update wrangler.toml

You need to update one line in the `wrangler.toml` file:

**Find this line:**
```toml
id = "template_worker_views"
```

**Replace it with:**
```toml
id = "your-namespace-id-from-step-1"
```

For example:
```toml
id = "abc123def456gh789..."
```

Save the file.

---

## Step 3: Deploy Worker via Dashboard

### Option A: Upload Files Directly

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages**
3. Click **Create** button
4. Click **Create Worker** (or **Upload Worker**)
5. Name it: `chomp-urls`
6. Click **Deploy**

Then you need to upload your code:
1. Click **Quick Edit** or **Edit Code**
2. Copy the contents of `src/index.js`
3. Paste it into the editor
4. Click **Save and Deploy**

### Option B: Connect GitHub (Recommended - Easiest!)

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages**
3. Click **Create Application**
4. Select the **Pages** tab
5. Click **Connect to Git**
6. Authorize Cloudflare to access your GitHub
7. Select your repository: `chomp-chomp-chomp/urls`
8. Select branch: `claude/cloudflare-setup-admin-panel-aIyVC` (or main)
9. Build settings:
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** (leave empty)
10. Click **Save and Deploy**

**Note:** Actually, for Workers (not Pages), you'll still need Wrangler for the initial deployment. See Option C below.

### Option C: Use Cloudflare's Online Editor

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages**
3. Click **Create Application**
4. Click **Create Worker**
5. Name it: `chomp-urls`
6. Click **Deploy**
7. Click **Quick Edit**
8. Delete all the sample code
9. Copy and paste your entire `src/index.js` file
10. Click **Save and Deploy**

---

## Step 4: Bind KV Namespace to Worker

After deploying the worker:

1. Go to your worker: **Workers & Pages** → **chomp-urls**
2. Click **Settings**
3. Scroll down to **Variables and Secrets**
4. Under **KV Namespace Bindings**, click **Add binding**
5. Variable name: `URLS`
6. KV namespace: Select `chomp-urls-URLS` (from Step 1)
7. Click **Save**
8. Click **Deploy** to redeploy with the binding

---

## Step 5: Set Environment Variables (Admin Password & API Key)

Still in the Settings page:

### Set Admin Password:
1. Under **Environment Variables**, click **Add variable**
2. Type: **Secret** (encrypted)
3. Variable name: `ADMIN_PASSWORD`
4. Value: Enter a strong password (e.g., `MySecure-Admin-Pass-2026!`)
5. Click **Encrypt** then **Save**

### Set API Key:
1. Click **Add variable** again
2. Type: **Secret**
3. Variable name: `API_KEY`
4. Value: Enter a strong API key (e.g., `sk_live_abc123XYZ789...`)
5. Click **Encrypt** then **Save**

### Deploy Changes:
6. Click **Deploy** button at the top to apply the changes

---

## Step 6: Test Your Worker

1. In your worker dashboard, you'll see a URL like:
   ```
   https://chomp-urls.your-account.workers.dev
   ```
2. Click on it or copy it
3. Add `/admin` to the end:
   ```
   https://chomp-urls.your-account.workers.dev/admin
   ```
4. You should see the login page!
5. Login with the admin password you set in Step 5

---

## Step 7: Add Custom Domain (chom.pm)

1. In your worker dashboard (**Workers & Pages** → **chomp-urls**)
2. Click **Settings** tab
3. Click **Domains & Routes**
4. Click **Add Custom Domain**
5. Enter: `chom.pm`
6. Click **Add Custom Domain**

Cloudflare will automatically:
- Create DNS records
- Set up SSL certificate
- Route traffic to your worker

**Done! Your URL shortener is now live at https://chom.pm** 🎉

---

## Step 8: Upload Admin HTML (Important!)

The admin panel won't work until we add the HTML file. Here's how:

### Option 1: Add to Worker Code

1. Go to **Workers & Pages** → **chomp-urls**
2. Click **Quick Edit**
3. You need to embed the admin.html content into your worker code

The worker code already handles this - it serves the HTML at the `/admin` route from `src/admin.html`.

However, for Workers, you need to either:
- Bundle the files together, OR
- Use Wrangler to deploy (which handles bundling)

### Option 2: Use Workers Assets (Simpler)

Since the code references separate files, you'll need to either:

1. **Inline the HTML:** Copy the contents of `src/admin.html` and replace the import in `src/index.js`
2. **Use Wrangler:** Which automatically bundles everything

**Recommendation:** Let me help you create a single-file version that you can upload directly!

---

## Alternative: Single-File Upload Version

If you want to skip all the complexity, I can create a single JavaScript file that includes everything (HTML embedded as a string). Then you can:

1. Copy that single file
2. Paste it into the Cloudflare Workers editor
3. Click Deploy
4. Done!

Would you like me to create that single-file version? Let me know!

---

## Verification Checklist

- [ ] KV namespace created (`chomp-urls-URLS`)
- [ ] Worker deployed (`chomp-urls`)
- [ ] KV namespace bound to worker (binding name: `URLS`)
- [ ] ADMIN_PASSWORD secret set
- [ ] API_KEY secret set
- [ ] Worker redeployed after settings changes
- [ ] Worker URL accessible
- [ ] Admin page loads at `/admin`
- [ ] Can login with admin password
- [ ] Custom domain `chom.pm` added
- [ ] Can access https://chom.pm/admin

---

## Troubleshooting

### Admin page shows "Cannot read property 'get' of undefined"
- The KV namespace isn't bound correctly
- Go to Settings → Variables → KV Namespace Bindings
- Make sure binding name is exactly: `URLS`

### Admin login shows 401 error
- ADMIN_PASSWORD secret not set
- Go to Settings → Variables → Add secret
- Name: `ADMIN_PASSWORD`, Value: your password

### Worker not updating after changes
- Click the **Deploy** button after making any settings changes
- Changes to variables/secrets require a new deployment

---

## What You'll Have After Completion

✅ **URL Shortener:** https://chom.pm
✅ **Admin Panel:** https://chom.pm/admin
✅ **API Endpoint:** https://chom.pm/api/shorten
✅ **Global CDN:** Fast redirects worldwide
✅ **SSL/HTTPS:** Automatic secure connections

---

## Next Steps

1. Test creating your first short URL
2. Test the API with curl or Postman
3. Share your short links!

No terminal required! 🎉
