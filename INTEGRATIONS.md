# Platform Integrations

Your URL shortener is now available on every platform! Choose your setup:

---

## 🎨 Favicons & Touch Icons

**Make your URL shortener look professional with custom icons**

### What You Get:
- ✅ Custom favicon in browser tabs
- ✅ Beautiful icon when bookmarked
- ✅ iOS home screen icon (Add to Home Screen)
- ✅ Android home screen icon
- ✅ PWA-ready with proper icons

### Setup Time: **10 minutes**

**📖 Full Guide:** See [ADD-ICONS-GUIDE.md](ADD-ICONS-GUIDE.md)

### Quick Setup:
1. Create icon files (16x16, 32x32, 180x180, 192x192, 512x512)
2. Run `bash convert-icons-to-base64.sh` to convert to base64
3. Update `worker-themed-no-titles.js` with the base64 data
4. Deploy to Cloudflare
5. Done!

The worker is already configured with icon meta tags and serving routes. You just need to add your icon data!

---

## 📱 iOS & iPadOS

**Use Apple Shortcuts to add to Share Sheet**

### What You Get:
- ✅ Share Sheet integration in Safari and all apps
- ✅ Automatic clipboard copy
- ✅ Notification showing short URL
- ✅ Siri integration possible
- ✅ Home Screen widget option

### Setup Time: **5 minutes**

**📖 Full Guide:** See [IOS-SHORTCUTS.md](IOS-SHORTCUTS.md)

### Quick Setup:
1. Open **IOS-SHORTCUTS.md** and follow the exact action-by-action build
2. Add **Get Contents of URL** with POST + JSON body (`url: Shortcut Input`)
3. Add headers: `Content-Type` and `X-API-Key`
4. Extract `shortUrl`, copy to clipboard, show notification
5. Enable **Show in Share Sheet** for URL types
6. Done!

### Usage:
- Tap Share button on any page
- Select "Shorten URL"
- URL is shortened and copied automatically
- Paste anywhere!

---

## 💻 Chrome Extension

**Install browser extension for one-click shortening**

### What You Get:
- ✅ One-click from toolbar icon
- ✅ Auto-fills current page URL
- ✅ Automatic clipboard copy
- ✅ Right-click context menu
- ✅ Custom short codes
- ✅ Dark mode support
- ✅ Keyboard shortcut (Ctrl+Shift+S)

### Setup Time: **5 minutes**

**📖 Full Guide:** See [chrome-extension/README.md](chrome-extension/README.md)

### Quick Setup:
1. Open chrome://extensions
2. Enable Developer Mode
3. Click "Load unpacked"
4. Select `chrome-extension` folder (icons are already bundled)
5. Enter API key in extension settings
6. Done!

### Usage:
- **Click extension icon** → Current page shortened → Copied!
- **Right-click page** → "Shorten this URL" → Copied!
- **Right-click link** → Shorten that link → Copied!
- **Press Ctrl+Shift+S** → Instant shorten → Copied!

---

## 🌐 Browser Bookmarklet

**One-click shortening from any browser**

### What You Get:
- ✅ Works in any browser (Chrome, Firefox, Safari, Edge)
- ✅ No installation required
- ✅ Automatic clipboard copy
- ✅ Alert shows short URL

### Setup Time: **2 minutes**

**📖 Full Guide:** See [BOOKMARKLET.md](BOOKMARKLET.md)

### Quick Setup:
1. Copy the bookmarklet code
2. Replace YOUR-API-KEY with your actual key
3. Create a bookmark with that code as the URL
4. Done!

### Usage:
- Navigate to any page
- Click the bookmarklet
- URL shortened and copied automatically
- Alert shows the short URL

---

## 🖥️ Desktop Apps

### macOS Shortcuts
Similar to iOS Shortcuts:
1. Open Shortcuts.app on Mac
2. Create same workflow as iOS
3. Add to menu bar
4. Works system-wide!

### Windows/Linux
Use bookmarklet or Chrome extension

---

## 📊 Comparison

| Feature | iOS | Chrome Ext | Bookmarklet |
|---------|-----|------------|-------------|
| Auto-copy | ✅ | ✅ | ✅ |
| Custom codes | ❌ | ✅ | ⚠️ Via prompt |
| Context menu | ❌ | ✅ | ❌ |
| Share Sheet | ✅ | ❌ | ❌ |
| Dark mode | ✅ | ✅ | ❌ |
| Installation | Easy | Medium | Easiest |
| All browsers | ❌ | Chrome only | ✅ |

---

## 🎯 Recommended Setup

### For iPhone/iPad Users:
✅ **iOS Shortcuts** (primary)
✅ **Bookmarklet** (backup for other browsers)

### For Desktop Users:
✅ **Chrome Extension** (best experience)
✅ **Bookmarklet** (for Firefox/Safari)

### For Power Users:
✅ **All three!**
- iOS Shortcuts on mobile
- Chrome Extension on desktop
- Bookmarklet as universal backup

---

## 🔑 Getting Your API Key

All integrations need your API key:

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages** → **chomp-urls**
3. Click **Settings** → **Variables**
4. Find **API_KEY** (the secret you set during deployment)
5. Copy the value

**Security Note:** Each integration stores the API key differently:
- iOS Shortcuts: In the shortcut itself
- Chrome Extension: Chrome sync storage (encrypted)
- Bookmarklet: In the bookmark URL

Don't share your integrations or API key with others!

---

## 📱 Advanced: All-Platform Setup

Want URL shortening everywhere? Here's the ultimate setup:

### Mobile (iOS/Android):
- **iOS:** Shortcuts + Bookmarklet
- **Android:** Bookmarklet only

### Desktop:
- **Chrome/Edge:** Extension
- **Firefox:** Bookmarklet
- **Safari:** Bookmarklet

### Command Line:
Create a bash alias:
```bash
# Add to ~/.bashrc or ~/.zshrc
alias shorten='function _shorten() {
  curl -X POST https://chmp.me/api/shorten \
    -H "X-API-Key: YOUR-API-KEY" \
    -H "Content-Type: application/json" \
    -d "{\"url\":\"$1\"}" | jq -r ".shortUrl" | pbcopy && pbpaste
}; _shorten'

# Usage: shorten "https://example.com"
```

### Automation:
- **Zapier:** Trigger on RSS feed → Shorten → Post to Twitter
- **IFTTT:** New blog post → Shorten → Share
- **n8n:** Custom workflows with shortening step

---

## 🎉 What You Can Do Now

With these integrations, you can:

### On iPhone/iPad:
- Share any webpage instantly
- Quick links for text messages
- Newsletter links (with iOS Mail)
- Social media sharing

### On Desktop:
- One-click from any page
- Right-click any link to shorten
- Keyboard shortcuts for speed
- Custom codes for branding

### Everywhere:
- Consistent short URLs across devices
- Click tracking shows which platform drives traffic
- Clipboard always ready to paste

---

## 💡 Pro Tips

### Workflow Ideas:

**Content Creator:**
1. Write blog post
2. Shorten URL with custom code
3. Share on social media
4. Track which platform drives clicks

**Email Marketer:**
1. Create campaign page
2. Shorten with code like `newsletter-jan-2026`
3. Include in email
4. Monitor engagement via click stats

**Developer:**
1. Deploy new feature
2. Shorten staging URL
3. Share with team
4. Track testing progress

**Social Media Manager:**
1. Schedule posts
2. Create short URLs for each platform
3. Use platform-specific codes (twitter-post-1, fb-ad-jan)
4. Compare platform performance

---

## 🆘 Troubleshooting

### "Invalid API Key" Everywhere
- Check you're using the correct API key
- Get it from Cloudflare: Workers & Pages → Settings → Variables
- Make sure there are no spaces before/after

### iOS Shortcuts Not Working
- Verify API key is in the shortcut
- Check internet connection
- Try with example.com first

### Chrome Extension Issues
- Make sure extension is enabled
- API key set in settings
- Check chrome://extensions for errors

### Bookmarklet Not Working
- Make sure code starts with `javascript:`
- API key must be in the code
- Try in incognito mode (no interference from other extensions)

---

## 📚 Documentation

- **iOS Setup:** [IOS-SHORTCUTS.md](IOS-SHORTCUTS.md)
- **Chrome Extension:** [chrome-extension/README.md](chrome-extension/README.md)
- **Bookmarklet:** [BOOKMARKLET.md](BOOKMARKLET.md)
- **API Usage:** [API-USAGE.md](API-USAGE.md)

---

## Summary

✅ **iOS Share Sheet** - Native iOS integration
✅ **Chrome Extension** - Best desktop experience
✅ **Bookmarklet** - Universal browser support
✅ **All platforms** - Shorten URLs anywhere
✅ **Auto-copy** - Always ready to paste
✅ **Custom codes** - Brand your links
✅ **Click tracking** - Monitor performance

Choose your platform and get started! 🚀
