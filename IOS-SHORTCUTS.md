# iOS Share Sheet Integration

Use Apple Shortcuts to add your URL shortener to the iOS/iPadOS Share Sheet with automatic clipboard copy!

---

## 🎯 What This Does

When you tap "Share" on any webpage:
1. See "Shorten URL" in the share sheet
2. Tap it → URL is automatically shortened
3. Short URL is copied to your clipboard
4. Notification shows the short URL
5. Paste anywhere with a tap!

---

## 📱 Setup Instructions

### Step 1: Open Shortcuts App

1. Open the **Shortcuts** app on your iPhone/iPad
2. Tap the **"+"** button to create a new shortcut

### Step 2: Build the Shortcut

Follow these steps exactly:

#### Action 1: Receive Share Sheet Input
1. Tap **"Add Action"**
2. Search for **"Receive"**
3. Select **"Receive URLs from Share Sheet"**
4. This will be the input from Safari/other apps

#### Action 2: Get URL from Input
1. Tap **"+"** to add another action
2. Search for **"Get Variable"**
3. Select **"Shortcut Input"**
4. This captures the URL being shared

#### Action 3: Call Your API
1. Tap **"+"** to add another action
2. Search for **"Get Contents of URL"**
3. Configure it:
   - **URL:** `https://chom.pm/api/shorten`
   - **Method:** `POST`
   - **Headers:** Add these two headers:
     - Header 1:
       - Key: `Content-Type`
       - Value: `application/json`
     - Header 2:
       - Key: `X-API-Key`
       - Value: `YOUR-API-KEY-HERE` (replace with your actual API key)
   - **Request Body:** `JSON`
   - Tap **"Show More"**
   - Under JSON, add:
     - Key: `url`
     - Value: Tap and select **"Shortcut Input"** from variables

#### Action 4: Get Short URL from Response
1. Tap **"+"** to add another action
2. Search for **"Get Dictionary Value"**
3. Configure:
   - **Get:** `shortUrl`
   - **from:** Tap and select **"Contents of URL"** (from previous step)

#### Action 5: Copy to Clipboard
1. Tap **"+"** to add another action
2. Search for **"Copy to Clipboard"**
3. Tap the text field
4. Select **"Dictionary Value"** from variables

#### Action 6: Show Notification
1. Tap **"+"** to add another action
2. Search for **"Show Notification"**
3. Configure:
   - **Title:** `URL Shortened!`
   - **Body:** Tap and select **"Dictionary Value"** from variables

### Step 3: Configure Shortcut Settings

1. Tap the **settings icon** (⚙️) at the top
2. Rename to **"Shorten URL"**
3. Choose an icon and color (I recommend 🔗 and red)
4. Enable **"Show in Share Sheet"**
5. Under **"Share Sheet Types"**, select:
   - ✅ **URLs**
   - ✅ **Safari Web Pages**
   - ✅ **Text** (optional)
6. Tap **"Done"**

---

## 🚀 How to Use

### From Safari:
1. Open any webpage in Safari
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **"Shorten URL"**
4. Wait ~1 second
5. See notification with short URL
6. **Short URL is already in your clipboard!**
7. Paste anywhere (Messages, Notes, etc.)

### From Other Apps:
Works with any app that shares URLs:
- Chrome
- Twitter
- Reddit
- News apps
- Email apps

---

## 📋 Visual Guide

```
Shortcuts Flow:
┌────────────────────────────┐
│ Receive URLs from Share    │
│ Sheet                      │
└────────────────────────────┘
           ↓
┌────────────────────────────┐
│ Get Shortcut Input         │
└────────────────────────────┘
           ↓
┌────────────────────────────┐
│ Get Contents of URL        │
│ POST chom.pm/api/shorten   │
│ Headers: API Key           │
│ Body: {"url": input}       │
└────────────────────────────┘
           ↓
┌────────────────────────────┐
│ Get Dictionary Value       │
│ Key: "shortUrl"            │
└────────────────────────────┘
           ↓
┌────────────────────────────┐
│ Copy to Clipboard          │
└────────────────────────────┘
           ↓
┌────────────────────────────┐
│ Show Notification          │
│ "URL Shortened!"           │
└────────────────────────────┘
```

---

## 🔧 Alternative: Simpler Version (No Notification)

If you want even simpler:

1. **Receive URLs from Share Sheet**
2. **Get Contents of URL** (same as above)
3. **Get Dictionary Value** for `shortUrl`
4. **Copy to Clipboard**

That's it! Only 4 actions.

---

## 🎨 Advanced: Custom Short Codes

To create custom short codes:

Modify **Action 3** (Get Contents of URL):
- In the JSON body, add a second field:
  - Key: `shortCode`
  - Value: `Ask Each Time` (this will prompt you for a custom code)

Now when you use it, you'll be asked to enter a custom code!

---

## 🔐 Security Note

Your API key is stored in the shortcut. To protect it:
- ✅ Don't share this shortcut with others
- ✅ Don't post screenshots showing the API key
- ✅ If compromised, generate a new API key in Cloudflare

---

## 🆘 Troubleshooting

### "Request Failed" Error
- Check your API key is correct
- Make sure headers are exactly as shown
- Verify you have internet connection

### Nothing Happens
- Make sure "Show in Share Sheet" is enabled
- Check "Share Sheet Types" includes URLs
- Try restarting the Shortcuts app

### "Invalid API Key" Notification
- Double-check your API key in Cloudflare Dashboard
- Make sure there are no spaces before/after the key
- Key should match exactly what's in Workers settings

### Clipboard Not Working
- Make sure "Copy to Clipboard" action is included
- Check that you're selecting "Dictionary Value" as the input
- Try manually tapping paste to see clipboard contents

---

## 📱 Pro Tips

### Add to Home Screen
1. Create the shortcut as above
2. Long-press the shortcut in Shortcuts app
3. Select "Add to Home Screen"
4. Now tap the icon to shorten current Safari page!

### Siri Integration
1. Record a Siri phrase: "Hey Siri, shorten this"
2. Works from Safari or any app with a URL
3. Hands-free shortening!

### Widget Support
Add the shortcut to your Home Screen widget for quick access.

---

## 🎉 What You Can Do

- Share articles quickly on social media
- Create short links for text messages
- Generate links for emails
- Quick link sharing in Slack/Discord
- Track which platform gets more clicks

---

## Summary

✅ **One-tap** URL shortening from any app
✅ **Automatic** clipboard copy
✅ **Works** in Safari, Chrome, apps
✅ **Fast** - shortens in ~1 second
✅ **Notification** shows the short URL
✅ **Siri** integration possible
✅ **Home Screen** icon option

Enjoy your iOS Share Sheet integration! 📱🔗
