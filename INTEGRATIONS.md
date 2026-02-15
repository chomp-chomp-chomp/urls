# Platform Integrations

Your URL shortener is now available on every platform! Choose your setup:

---

## 📱 iOS & iPadOS

**Use Apple Shortcuts to add to Share Sheet**

### What You Get:
- ✅ Share Sheet integration in Safari and all apps
- ✅ Automatic clipboard copy
- ✅ Notification showing short URL
- ✅ Siri integration possible
- ✅ Home Screen widget option

### Setup Time: **3 minutes**

**📖 Full Guide:** See [IOS-SHORTCUTS.md](IOS-SHORTCUTS.md)

### Quick Setup:
1. Open Shortcuts app
2. Create new shortcut
3. Add these actions:
   - Receive URLs from Share Sheet
   - Get Contents of URL (POST to chom.pm/api/shorten with API key)
   - Get Dictionary Value ("shortUrl")
   - Copy to Clipboard
   - Show Notification
4. Enable "Show in Share Sheet"
5. Done!

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
1. Create icon files (16x16, 48x48, 128x128 pixels)
2. Open chrome://extensions
3. Enable Developer Mode
4. Click "Load unpacked"
5. Select `chrome-extension` folder
6. Enter API key in settings
7. Done!

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
  curl -X POST https://chom.pm/api/shorten \
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
