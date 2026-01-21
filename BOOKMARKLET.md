# Browser Bookmarklet for Instant URL Shortening

This bookmarklet allows you to shorten the current page URL with just one click from your browser!

---

## What is a Bookmarklet?

A bookmarklet is a bookmark that runs JavaScript code instead of opening a webpage. You can click it anytime to quickly shorten whatever page you're currently viewing.

---

## Installation Instructions

### Step 1: Copy the Bookmarklet Code

Copy this entire JavaScript code (one long line):

```javascript
javascript:(function(){const url=window.location.href;const apiKey='YOUR-API-KEY-HERE';const domain='https://chom.pm';fetch(domain+'/api/shorten',{method:'POST',headers:{'X-API-Key':apiKey,'Content-Type':'application/json'},body:JSON.stringify({url:url})}).then(r=>r.json()).then(d=>{if(d.success){navigator.clipboard.writeText(d.shortUrl);alert('✅ Short URL copied to clipboard!\\n\\n'+d.shortUrl);}else{alert('❌ Error: '+d.error);}}).catch(e=>alert('❌ Network error: '+e.message));})();
```

**IMPORTANT:** Replace `YOUR-API-KEY-HERE` with your actual API key!

After replacing your API key, it should look like:
```javascript
javascript:(function(){const url=window.location.href;const apiKey='sk_live_abc123XYZ789';const domain='https://chom.pm';fetch(domain+'/api/shorten',{method:'POST',headers:{'X-API-Key':apiKey,'Content-Type':'application/json'},body:JSON.stringify({url:url})}).then(r=>r.json()).then(d=>{if(d.success){navigator.clipboard.writeText(d.shortUrl);alert('✅ Short URL copied to clipboard!\\n\\n'+d.shortUrl);}else{alert('❌ Error: '+d.error);}}).catch(e=>alert('❌ Network error: '+e.message));})();
```

### Step 2: Create the Bookmark

#### For Chrome, Edge, Brave:
1. Press **Ctrl+Shift+B** (Windows) or **Cmd+Shift+B** (Mac) to show the bookmarks bar
2. **Right-click** on the bookmarks bar
3. Click **"Add page"** or **"Add bookmark"**
4. **Name:** `🔗 Shorten URL`
5. **URL:** Paste the JavaScript code (with your API key)
6. Click **Save**

#### For Firefox:
1. Press **Ctrl+Shift+B** (Windows) or **Cmd+Shift+B** (Mac) to open bookmarks
2. Click **"Add Bookmark"** or right-click in bookmarks toolbar
3. **Name:** `🔗 Shorten URL`
4. **Location:** Paste the JavaScript code (with your API key)
5. Click **Add**

#### For Safari:
1. Show the bookmarks bar: **View** → **Show Favorites Bar**
2. **Right-click** on the favorites bar
3. Click **"Add Bookmark"**
4. **Name:** `🔗 Shorten URL`
5. **Address:** Paste the JavaScript code (with your API key)
6. Click **Add**

---

## How to Use

1. **Navigate** to any webpage you want to shorten
2. **Click** the "🔗 Shorten URL" bookmark
3. **Done!** The short URL is:
   - ✅ Automatically copied to your clipboard
   - ✅ Shown in an alert popup
4. **Paste** the short URL anywhere you want (Ctrl+V or Cmd+V)

---

## Example Usage

Let's say you're on:
```
https://www.example.com/articles/2025/01/this-is-a-very-long-article-title-about-something
```

1. Click the bookmarklet
2. You get: `https://chom.pm/abc123`
3. It's already in your clipboard, ready to paste!

---

## Advanced: Bookmarklet with Custom Short Code

If you want to specify a custom short code, use this version:

```javascript
javascript:(function(){const url=window.location.href;const apiKey='YOUR-API-KEY-HERE';const domain='https://chom.pm';const code=prompt('Enter custom short code (or leave blank for random):');const body=code?{url:url,shortCode:code}:{url:url};fetch(domain+'/api/shorten',{method:'POST',headers:{'X-API-Key':apiKey,'Content-Type':'application/json'},body:JSON.stringify(body)}).then(r=>r.json()).then(d=>{if(d.success){navigator.clipboard.writeText(d.shortUrl);alert('✅ Short URL copied to clipboard!\\n\\n'+d.shortUrl);}else{alert('❌ Error: '+d.error);}}).catch(e=>alert('❌ Network error: '+e.message));})();
```

This version will:
1. Prompt you for a custom short code
2. If you enter one, it uses that
3. If you leave it blank, it generates a random one

---

## Troubleshooting

### "Invalid API key" error
- Make sure you replaced `YOUR-API-KEY-HERE` with your actual API key
- The API key should be inside the single quotes

### Nothing happens when I click
- Make sure the bookmark URL starts with `javascript:`
- Some browsers might strip `javascript:` when pasting - add it manually if needed
- Check that you copied the entire code (it's one very long line)

### "Short code already exists" error
- The random code conflicted (very rare) - just try again
- Or use the custom code version and specify a unique code

### CORS or Network errors
- Make sure your worker is deployed and accessible
- Check that the domain in the code matches your domain (`https://chom.pm`)

---

## Security Note

Your API key is stored in plain text in the bookmark. This means:
- ✅ **OK for personal use** on your own computer
- ❌ **Don't share** the bookmarklet with others (they'll get your API key)
- ❌ **Don't use** on public/shared computers

If you want to share the shortening feature with others, give them access to the admin panel instead, or create a separate API key for them.

---

## Alternative: Browser Extension

If you want something more secure and feature-rich, you could create a browser extension. Let me know if you'd like help with that!

---

## Summary

✅ **One-click URL shortening** from anywhere
✅ **Auto-copy to clipboard** - ready to paste immediately
✅ **No typing required** - just click and paste
✅ **Works on any webpage** - even localhost!
✅ **Optional custom short codes** with advanced version

Enjoy your super-fast URL shortening! 🚀
