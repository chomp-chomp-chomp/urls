# GitHub Actions Auto-Deployment Setup

Your worker will now auto-deploy to Cloudflare whenever you push code! Here's how to complete the setup.

---

## 🔑 Step 1: Get Your Cloudflare API Token

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click **"Create Token"**
3. Click **"Use template"** next to **"Edit Cloudflare Workers"**
4. Configure the token:
   - **Token name:** GitHub Actions Deploy
   - **Permissions:** Keep the defaults (should include Workers Scripts:Edit)
   - **Account Resources:** Include → Your account
   - **Zone Resources:** All zones (or select specific zones if preferred)
5. Click **"Continue to summary"**
6. Click **"Create Token"**
7. **COPY THE TOKEN** (you won't see it again!)

---

## 🆔 Step 2: Get Your Cloudflare Account ID

1. Go to https://dash.cloudflare.com/
2. Click on **Workers & Pages** in the left sidebar
3. Look at the URL in your browser - it will be something like:
   ```
   https://dash.cloudflare.com/1234567890abcdef1234567890abcdef/workers-and-pages
                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                              This is your Account ID
   ```
4. **Copy your Account ID** (the long hex string in the URL)

**Alternative:** Click any Worker, then click "Settings" - your Account ID is shown on the right side.

---

## 🔐 Step 3: Add Secrets to GitHub

1. Go to your GitHub repository: https://github.com/chomp-chomp-chomp/urls
2. Click **"Settings"** (top menu)
3. In the left sidebar, click **"Secrets and variables"** → **"Actions"**
4. Click **"New repository secret"**

### Add First Secret:
- **Name:** `CLOUDFLARE_API_TOKEN`
- **Value:** Paste the API token from Step 1
- Click **"Add secret"**

### Add Second Secret:
- Click **"New repository secret"** again
- **Name:** `CLOUDFLARE_ACCOUNT_ID`
- **Value:** Paste the Account ID from Step 2
- Click **"Add secret"**

### Add Third Secret (Admin Password):
- Click **"New repository secret"** again
- **Name:** `ADMIN_PASSWORD`
- **Value:** Your admin panel password (e.g., "mySecurePassword123")
- Click **"Add secret"**

### Add Fourth Secret (API Key):
- Click **"New repository secret"** again
- **Name:** `API_KEY`
- **Value:** Your API key for the shortener (e.g., "sk_live_abc123xyz789")
- Click **"Add secret"**

**Important:** These secrets are stored securely in GitHub and deployed to Cloudflare automatically. You only need to set them once!

---

## ✅ Step 4: Test the Deployment

Once the secrets are added:

1. Commit and push any change to your repo:
   ```bash
   git add .
   git commit -m "Test auto-deployment"
   git push
   ```

2. Watch the deployment:
   - Go to your GitHub repo
   - Click the **"Actions"** tab
   - You should see "Deploy to Cloudflare Workers" running
   - Click on it to watch the progress

3. After it completes (usually 30-60 seconds):
   - Visit https://chom.pm/admin
   - Your latest code should be deployed!

---

## 🎯 How It Works

From now on, whenever you push to these branches:
- `claude/cloudflare-setup-admin-panel-aIyVC` (your current development branch)
- `main` (your production branch)

GitHub Actions will:
1. ✅ Check out your code
2. ✅ Install dependencies
3. ✅ Deploy to Cloudflare Workers
4. ✅ Update your live worker at chom.pm

**No more manual copy/paste!** 🎉

---

## 🔧 Workflow Details

The workflow is defined in `.github/workflows/deploy.yml` and runs on every push.

**Key features:**
- Uses official Cloudflare Wrangler Action (v3)
- Runs on Ubuntu latest
- Node.js 20
- Deploys using your `wrangler.toml` configuration

---

## 🆘 Troubleshooting

### Action Fails: "Could not find wrangler.toml"
- Make sure `wrangler.toml` is in your repo root
- Check that it's committed to git

### Action Fails: "Authentication error"
- Verify your `CLOUDFLARE_API_TOKEN` in GitHub Secrets
- Regenerate the token if needed (make sure it has Workers:Edit permission)

### Action Fails: "Account ID mismatch"
- Double-check your `CLOUDFLARE_ACCOUNT_ID` in GitHub Secrets
- Make sure it matches the account where your worker is deployed

### Deployment Succeeds but Changes Don't Show
- Clear your browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Check the Cloudflare dashboard to verify the worker code updated
- Wait 30 seconds for edge caches to clear

### Want to Deploy Only on Main Branch
Edit `.github/workflows/deploy.yml` and remove the development branch:
```yaml
on:
  push:
    branches:
      - main  # Only deploy on main
```

---

## 📊 Monitoring Deployments

### View Deployment History
1. Go to GitHub repo → **Actions** tab
2. See all deployment runs, their status, and logs

### View Live Worker
1. Go to Cloudflare Dashboard → Workers & Pages
2. Click on your worker
3. See deployment history and live version

---

## 🚀 Next Steps

After setting up GitHub Actions:

1. ✅ Delete the old conversion scripts (no longer needed):
   ```bash
   rm convert-icons-to-base64.sh
   rm ADD-ICONS-GUIDE.md
   rm FAVICON-SETUP.md
   ```

2. ✅ Make changes to your worker code locally
3. ✅ Commit and push
4. ✅ GitHub Actions deploys automatically
5. ✅ Your worker is live!

---

**That's it!** You now have professional CI/CD for your URL shortener. 🎉
