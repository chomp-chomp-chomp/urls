# Easiest Way to Deploy - Copy & Paste (No Terminal Required!)

This is the simplest possible way to get your URL shortener running. Everything is done through your web browser.

---

## Step 1: Create KV Namespace

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages** (left sidebar)
3. Click the **KV** tab
4. Click **Create a namespace** button
5. Name: `chomp-urls-URLS`
6. Click **Add**
7. **Copy the Namespace ID** (looks like: `abc123def456...`)
   - Keep this somewhere, you'll need it in Step 3!

---

## Step 2: Create Worker

1. Still in **Workers & Pages**, click the **Overview** tab
2. Click **Create** button
3. Click **Create Worker**
4. Name it: `chomp-urls`
5. Click **Deploy**

---

## Step 3: Paste the Code

1. You're now on your worker page
2. Click the **Quick Edit** button (top right)
3. **Delete all the default code**
4. Open the file: `worker-bundle.js` from this repository
5. **Copy all the code** (Ctrl+A, Ctrl+C or Cmd+A, Cmd+C)
6. **Paste it** into the Cloudflare editor
7. Click **Save and Deploy** button (top right)

---

## Step 4: Bind KV Namespace

1. Go back to your worker page (click the back arrow or close the editor)
2. Click **Settings** tab
3. Click **Variables** (in the left menu)
4. Scroll to **KV Namespace Bindings**
5. Click **Add binding**
   - Variable name: `URLS` (must be exactly this)
   - KV namespace: Select `chomp-urls-URLS`
6. Click **Save**

---

## Step 5: Set Secrets (Admin Password & API Key)

Still in the **Settings** → **Variables** page:

### Add Admin Password:
1. Scroll to **Environment Variables**
2. Click **Add variable**
3. Type: Select **Secret** (the encrypted option)
4. Variable name: `ADMIN_PASSWORD`
5. Value: Enter a strong password (e.g., `MySecure-Admin2026!`)
6. Click **Encrypt**

### Add API Key:
1. Click **Add variable** again
2. Type: Select **Secret**
3. Variable name: `API_KEY`
4. Value: Enter a strong random key (e.g., `sk_live_abc123XYZ789def456`)
   - Tip: Mash your keyboard to make something random!
5. Click **Encrypt**

### Deploy Changes:
6. Click **Save and Deploy** (at the bottom)

---

## Step 6: Test It!

1. Go back to **Workers & Pages** → **chomp-urls**
2. You'll see your worker URL, something like:
   ```
   https://chomp-urls.your-account.workers.dev
   ```
3. Click on it (or copy and paste into browser)
4. Add `/admin` to the end:
   ```
   https://chomp-urls.your-account.workers.dev/admin
   ```
5. You should see the beautiful purple admin login page!
6. Login with the password you set in Step 5

**If you can login and see the admin panel, YOU'RE DONE! 🎉**

---

## Step 7: Add Your Custom Domain (chom.pm)

1. Still in your worker page, click **Settings**
2. Click **Domains & Routes**
3. Click **Add Custom Domain**
4. Enter: `chom.pm`
5. Click **Add Custom Domain**

Cloudflare automatically sets everything up!

**Your URL shortener is now live at: https://chom.pm** 🚀

---

## What You Can Do Now

### Create Short URLs (Admin Panel):
1. Go to https://chom.pm/admin
2. Login with your admin password
3. Enter a long URL
4. (Optional) Enter a custom short code
5. Click "Create Short URL"
6. Done! Your short URL is ready to share

### Use the API:
```bash
curl -X POST https://chom.pm/api/shorten \
  -H "X-API-Key: YOUR-API-KEY-FROM-STEP-5" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/long/url"}'
```

### Share Short URLs:
- https://chom.pm/abc123
- https://chom.pm/newsletter
- https://chom.pm/signup
- etc.

---

## Troubleshooting

### "env.URLS is undefined" or KV errors
- Make sure you added the KV binding in Step 4
- The binding name must be exactly: `URLS` (all caps)
- Make sure you clicked "Save" after adding the binding

### "Unauthorized" when trying to login
- Make sure you set the ADMIN_PASSWORD in Step 5
- After adding environment variables, you must click "Save and Deploy"

### Admin page doesn't load / shows errors
- Make sure you copied ALL the code from `worker-bundle.js`
- Click "Save and Deploy" after pasting the code

### Custom domain not working
- Make sure chom.pm nameservers point to Cloudflare
- DNS can take up to 24 hours to propagate
- Check Cloudflare dashboard for domain status

---

## Summary

✅ **5-10 minutes total time**
✅ **No terminal/command line needed**
✅ **Just copy, paste, and click!**
✅ **Beautiful admin panel**
✅ **Full API access**
✅ **Custom domain support**

Enjoy your new URL shortener! 🎉
