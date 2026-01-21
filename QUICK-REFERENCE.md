# Quick Reference Guide

Everything you need to know about your URL shortener at a glance!

---

## 🎯 Quick Links

- **Admin Panel:** https://chom.pm/admin
- **Your Domain:** https://chom.pm
- **API Endpoint:** https://chom.pm/api/shorten

---

## ✨ Features You Have

### 1. Auto-Copy to Clipboard
When you create a short URL, it's **automatically copied** to your clipboard!
- Just create the URL
- Press Ctrl+V (or Cmd+V) to paste anywhere

### 2. Copy Buttons
Every URL has a green **Copy** button
- Click it to copy the short URL
- Button shows "Copied!" to confirm

### 3. Page Titles
URLs show the actual page title
- Fetched automatically from the original URL
- Helps identify links at a glance

### 4. Click Tracking
See stats for every URL:
- **📊 Click count** - Total clicks
- **🕐 Last clicked** - When it was last used
- **🌍 Top country** - Geographic data
- **📍 Top referrer** - Traffic source

### 5. Dashboard Stats
See overview at the top:
- Total number of short URLs
- Total clicks across all URLs

---

## 🚀 Common Tasks

### Create a Short URL (Random Code)
1. Go to admin panel
2. Enter long URL
3. Click "Create Short URL"
4. **Done!** Already in your clipboard

### Create a Short URL (Custom Code)
1. Go to admin panel
2. Enter long URL
3. Enter custom code (e.g., "newsletter")
4. Click "Create Short URL"
5. Get: https://chom.pm/newsletter

### Copy an Existing URL
1. Find the URL in your list
2. Click the green "Copy" button
3. Paste with Ctrl+V

### View Statistics
1. Open admin panel
2. Stats show inline with each URL
3. See clicks, referrer, country, etc.

### Delete a URL
1. Click the red "Delete" button
2. Confirm deletion
3. URL and its stats are removed

---

## 🔖 Browser Bookmarklet

**One-click shortening from any webpage!**

### Setup (5 minutes):
1. Get your API key from Cloudflare settings
2. Copy bookmarklet code from **BOOKMARKLET.md**
3. Replace `YOUR-API-KEY-HERE` with your actual key
4. Create a bookmark with that code as the URL

### Usage:
1. Browse to any page
2. Click the bookmarklet
3. **Boom!** Short URL created and copied
4. Paste anywhere with Ctrl+V

**Full guide:** See BOOKMARKLET.md

---

## 🔌 API Usage

### Basic Request:
```bash
curl -X POST https://chom.pm/api/shorten \
  -H "X-API-Key: YOUR-API-KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/long/url"}'
```

### With Custom Code:
```bash
curl -X POST https://chom.pm/api/shorten \
  -H "X-API-Key: YOUR-API-KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "shortCode": "custom"}'
```

### Response:
```json
{
  "success": true,
  "shortCode": "abc123",
  "url": "https://example.com/long/url",
  "shortUrl": "https://chom.pm/abc123"
}
```

**Full API docs:** See API-USAGE.md

---

## 📊 Understanding Your Stats

### Click Count
Total number of times the link was clicked

### Last Clicked
- "5s ago" - 5 seconds ago
- "2m ago" - 2 minutes ago
- "3h ago" - 3 hours ago
- "5d ago" - 5 days ago

### Top Referrer
Where clicks came from:
- `twitter.com` - From Twitter
- `facebook.com` - From Facebook
- `Direct` - Typed directly or bookmarked
- `google.com` - From Google search
- Domain of the referring website

### Top Country
Country code of most clicks:
- `US` - United States
- `GB` - United Kingdom
- `CA` - Canada
- `DE` - Germany
- `FR` - France
- `Unknown` - Could not determine

**Full tracking guide:** See CLICK-TRACKING.md

---

## 🔑 Important Information

### Your Credentials
**Location:** Cloudflare Dashboard → Workers & Pages → chomp-urls → Settings → Variables

- **ADMIN_PASSWORD** - For admin panel login
- **API_KEY** - For API requests

**Never share these!** They give full access to your shortener.

### KV Namespace
**Name:** chomp-urls-URLS
**Purpose:** Stores short URLs and click statistics

### Worker URL
**Format:** https://chomp-urls.your-account.workers.dev
**Custom Domain:** https://chom.pm

---

## 🆘 Troubleshooting

### Can't login to admin panel
- Check ADMIN_PASSWORD is set in Cloudflare settings
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private mode

### Auto-copy not working
- Make sure you deployed `worker-with-tracking.js`
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check browser console (F12) for errors

### Stats not showing
- Make sure you deployed `worker-with-tracking.js`
- Stats only count from deployment forward (not retroactive)
- Wait ~10 seconds and hard refresh

### API returns "Invalid API key"
- Check you're using the correct API_KEY from Cloudflare settings
- Verify header is `X-API-Key` (with capital letters)
- Make sure API_KEY is set as a Secret, not a Variable

### Short URL not redirecting
- Check the short code exists in your admin panel
- Verify KV binding is set correctly (binding name: `URLS`)
- Check Cloudflare dashboard for worker errors

---

## 📚 Documentation Files

### Setup & Deployment
- **CLOUDFLARE-SETUP-GUIDE.md** - Complete setup from scratch
- **EASIEST-DEPLOY.md** - Quick deployment guide
- **DEPLOY-STEPS.md** - Detailed deployment steps

### Features
- **WHATS-NEW.md** - Overview of all features
- **CLICK-TRACKING.md** - Complete tracking guide
- **BOOKMARKLET.md** - Browser bookmarklet setup
- **API-USAGE.md** - Full API documentation

### Reference
- **README.md** - Project overview
- **example-usage.md** - Advanced API examples
- **QUICK-REFERENCE.md** - This file!

---

## 💡 Tips & Tricks

### Organizing Links
Use descriptive custom codes:
- `/blog-jan-2026` - January blog post
- `/newsletter-winter` - Winter newsletter
- `/promo-50off` - 50% off promotion
- `/signup-form` - Sign up form

### Tracking Campaigns
Create unique codes for each campaign:
- `/twitter-launch` - Twitter campaign
- `/email-blast-1` - Email campaign #1
- `/fb-ad-summer` - Facebook summer ad

### Quick Access
Bookmark these pages:
- Admin panel: https://chom.pm/admin
- Cloudflare dashboard: https://dash.cloudflare.com

### Security
- Use strong ADMIN_PASSWORD (16+ characters)
- Use random API_KEY (32+ characters)
- Never commit secrets to git
- Don't share credentials

---

## 🎉 You Now Have

✅ Beautiful admin panel
✅ Auto-copy functionality
✅ Click tracking with analytics
✅ Page title fetching
✅ Copy buttons everywhere
✅ Browser bookmarklet
✅ Full REST API
✅ Custom domain support
✅ Global CDN (Cloudflare)
✅ Automatic HTTPS

**All running on Cloudflare's free tier!** 🚀

---

## 📞 Need More Help?

- **Setup issues?** Check EASIEST-DEPLOY.md
- **Tracking questions?** Check CLICK-TRACKING.md
- **API help?** Check API-USAGE.md
- **Bookmarklet?** Check BOOKMARKLET.md

---

Happy shortening! 🔗
