// Create context menu item when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'shortenUrl',
    title: 'Shorten this URL',
    contexts: ['page', 'link']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'shortenUrl') {
    // Get the URL (either from link or current page)
    const url = info.linkUrl || info.pageUrl;

    // Get API key from storage
    const { apiKey } = await chrome.storage.sync.get('apiKey');

    if (!apiKey) {
      // Show notification to set API key
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'URL Shortener',
        message: 'Please set your API key in the extension popup'
      });
      return;
    }

    // Call API to shorten URL
    try {
      const response = await fetch('https://chom.pm/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const shortUrl = data.shortUrl;

        // Copy to clipboard using content script
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (text) => {
            navigator.clipboard.writeText(text);
          },
          args: [shortUrl]
        });

        // Show success notification
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon48.png',
          title: 'URL Shortened!',
          message: shortUrl + '\n\n✓ Copied to clipboard'
        });
      } else {
        // Show error notification
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon48.png',
          title: 'Error',
          message: data.error || 'Failed to shorten URL'
        });
      }
    } catch (error) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'Network Error',
        message: 'Could not connect to shortener service'
      });
    }
  }
});

// Handle keyboard shortcut (optional)
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'shorten-current-page') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab?.url) {
      const { apiKey } = await chrome.storage.sync.get('apiKey');

      if (!apiKey) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon48.png',
          title: 'URL Shortener',
          message: 'Please set your API key first'
        });
        return;
      }

      try {
        const response = await fetch('https://chom.pm/api/shorten', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey
          },
          body: JSON.stringify({ url: tab.url })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (text) => {
              navigator.clipboard.writeText(text);
            },
            args: [data.shortUrl]
          });

          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon48.png',
            title: 'URL Shortened!',
            message: data.shortUrl + '\n\n✓ Copied to clipboard'
          });
        }
      } catch (error) {
        console.error('Error shortening URL:', error);
      }
    }
  }
});
