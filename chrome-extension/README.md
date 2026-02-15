# Chrome Extension - URL Shortener

Official Chrome extension for chom.pm URL shortener with automatic clipboard copy!

---

## 🎯 Features

- **One-click shortening** from extension icon
- **Auto-fills current page URL**
- **Custom short codes** optional
- **Auto-copy to clipboard** after shortening
- **Right-click context menu** - "Shorten this URL"
- **Dark mode support** - matches your system preferences
- **Keyboard shortcut** - Ctrl+Shift+S (optional)
- **Beautiful UI** - matches your site's design

---

## 📦 Installation

### Step 1: Get the Extension Files

All files are in the `chrome-extension/` folder:
- `manifest.json`
- `popup.html`
- `popup.js`
- `background.js`
- `README.md`

### Step 2: Create Icons

You need three icon sizes. You can either:

**Option A: Use a Logo/Icon Generator**
1. Go to https://favicon.io/favicon-generator/
2. Create a simple icon:
   - Text: "🔗" or "U"
   - Background: #e73b42 (your red)
   - Shape: Rounded
3. Download and extract
4. Rename files:
   - favicon-16x16.png → icon16.png
   - favicon-48x48.png → icon48.png (or create 48x48 version)
   - android-chrome-512x512.png → icon128.png (resize to 128x128)
5. Place all three in `chrome-extension/` folder

**Option B: Use Simple PNG Files**
Create three PNG files with these sizes:
- `icon16.png` - 16x16 pixels
- `icon48.png` - 48x48 pixels
- `icon128.png` - 128x128 pixels

Use any design - a link icon, your logo, or text.

**Option C: Use Existing Icons**
If you have an existing logo:
1. Resize it to 128x128 pixels
2. Save as `icon128.png`
3. Create smaller versions (48x48, 16x16)

### Step 3: Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions`
2. Enable **"Developer mode"** (toggle in top right)
3. Click **"Load unpacked"**
4. Select the `chrome-extension` folder
5. The extension should now appear in your extensions list!

### Step 4: Pin the Extension

1. Click the **puzzle piece icon** in Chrome toolbar
2. Find **"URL Shortener"**
3. Click the **pin icon** to pin it to toolbar

### Step 5: Configure API Key

1. Click the extension icon in toolbar
2. Click **"⚙️ Settings"** at the bottom
3. Enter your API key (from Cloudflare Dashboard)
4. Click **"Save Settings"**
5. Done! You're ready to shorten URLs

---

## 🚀 How to Use

### Method 1: Extension Icon
1. **Click the extension icon** in toolbar
2. Current page URL is **auto-filled**
3. (Optional) Enter a **custom short code**
4. Click **"Shorten URL"**
5. Short URL is **automatically copied to clipboard**
6. Notification shows the short URL
7. **Paste anywhere!**

### Method 2: Right-Click Context Menu
1. **Right-click** anywhere on a page
2. Select **"Shorten this URL"** from menu
3. Notification appears with short URL
4. **Already copied to clipboard!**

### Method 3: Right-Click on a Link
1. **Right-click** on any link
2. Select **"Shorten this URL"**
3. That specific link is shortened (not the current page)
4. **Copied to clipboard automatically**

### Method 4: Keyboard Shortcut (Optional)
1. Press **Ctrl+Shift+S** (Windows/Linux) or **Cmd+Shift+S** (Mac)
2. Current page is shortened instantly
3. Notification shows result
4. **Copied to clipboard**

To customize the keyboard shortcut:
1. Go to `chrome://extensions/shortcuts`
2. Find "URL Shortener"
3. Set your preferred shortcut

---

## 🎨 Features in Detail

### Auto-Fill Current URL
- Extension automatically grabs the current page URL
- No need to copy-paste!
- Works on any webpage

### Custom Short Codes
- Leave blank for random code
- Enter custom code for branded links
- Examples: `newsletter`, `signup`, `promo-2026`

### Clipboard Auto-Copy
- Every shortened URL is automatically copied
- Just paste with Ctrl+V (or Cmd+V)
- No extra click needed!

### Dark Mode
- Automatically matches your system theme
- Beautiful in both light and dark modes
- Uses your site's color scheme

### Context Menu Integration
- Right-click on any page → Shorten URL
- Right-click on any link → Shorten that link
- Super fast workflow!

---

## 🔐 Security & Privacy

### API Key Storage
- Stored securely in Chrome's `sync` storage
- Encrypted by Chrome
- Syncs across your Chrome browsers
- Never exposed to websites

### Permissions Explained
- **activeTab** - To read current page URL
- **clipboardWrite** - To copy short URLs
- **contextMenus** - For right-click menu
- **host_permissions** - To call chom.pm API

### Privacy
- Extension only communicates with chom.pm
- No tracking or analytics
- No data collection
- Open source code - you can review it!

---

## 🎯 Use Cases

### Quick Sharing
1. Reading an article
2. Click extension icon
3. Paste short URL in Slack/Discord/Twitter

### Email Signatures
1. Visit your LinkedIn/portfolio
2. Shorten the URL
3. Use in email signature

### Social Media
1. Find a product page
2. Right-click → Shorten URL
3. Share on social media

### QR Codes
1. Create short URL
2. Use short URL in QR code generator
3. Easier to scan and prettier!

---

## 🔧 Troubleshooting

### Extension Won't Load
- Make sure all files are in the same folder
- Check that icon files exist (icon16.png, icon48.png, icon128.png)
- Make sure Developer Mode is enabled

### "Invalid API Key" Error
- Check your API key in settings
- Get correct key from Cloudflare Dashboard: Workers & Pages → chomp-urls → Settings → Variables
- Make sure there are no spaces before/after the key

### Clipboard Not Working
- Make sure you granted clipboard permission
- Try clicking the extension icon (not just notification)
- Some sites may block clipboard access

### Context Menu Not Showing
- Right-click on the page content (not toolbar)
- Make sure extension is enabled
- Try reloading the extension

### Nothing Happens When Clicking Extension
- Check browser console (F12) for errors
- Make sure API key is set
- Verify internet connection

---

## 🔄 Updating the Extension

When you make changes to the code:

1. Go to `chrome://extensions`
2. Click the **refresh icon** on the extension card
3. Changes are applied immediately

---

## 📤 Sharing the Extension

To share with others:

### Method 1: ZIP File
1. Zip the `chrome-extension` folder
2. Share the ZIP file
3. Recipients unzip and load unpacked

### Method 2: Chrome Web Store (Advanced)
1. Create developer account ($5 one-time fee)
2. Package extension as .crx
3. Submit to Chrome Web Store
4. Users can install with one click

---

## 🎉 What You Can Do

✅ **Shorten** any URL with one click
✅ **Auto-copy** to clipboard instantly
✅ **Custom codes** for branded links
✅ **Right-click** anywhere to shorten
✅ **Keyboard shortcut** for power users
✅ **Dark mode** support
✅ **Beautiful UI** matching your site
✅ **Privacy-focused** - no tracking

---

## 💡 Pro Tips

### Workflow Optimization
1. Pin extension to toolbar for quick access
2. Set keyboard shortcut for fastest shortening
3. Use context menu on links without opening them

### Custom Codes Strategy
- Use descriptive codes for important links
- Random codes for temporary/one-time links
- Follow naming convention: `category-name-date`

### Integration
- Combine with bookmarklet for mobile
- Use iOS Shortcuts for iPhone/iPad
- Extension for desktop browsing

---

## 📚 Files Included

- **manifest.json** - Extension configuration
- **popup.html** - Extension popup UI
- **popup.js** - Popup logic and API calls
- **background.js** - Context menu and notifications
- **README.md** - This file

**You need to add:**
- **icon16.png** - 16x16 icon
- **icon48.png** - 48x48 icon
- **icon128.png** - 128x128 icon

---

## 🆘 Need Help?

- Check this README first
- Review the troubleshooting section
- Inspect browser console for errors (F12)
- Make sure all files are present

---

## Summary

🎯 **Installation:** Load unpacked in chrome://extensions
🔑 **Setup:** Enter API key in settings
🚀 **Use:** Click icon, right-click, or keyboard shortcut
📋 **Result:** Short URL automatically copied to clipboard!

Enjoy your Chrome extension! 🎉
