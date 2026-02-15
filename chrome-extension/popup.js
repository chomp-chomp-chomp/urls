// Load API key and current tab URL when popup opens
document.addEventListener('DOMContentLoaded', async () => {
  // Load saved API key
  const { apiKey } = await chrome.storage.sync.get('apiKey');
  if (apiKey) {
    document.getElementById('apiKey').value = apiKey;
  }

  // Get current tab URL
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.url && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
    document.getElementById('url').value = tab.url;
  }

  // Focus on URL input if empty, otherwise on short code
  if (!document.getElementById('url').value) {
    document.getElementById('url').focus();
  } else {
    document.getElementById('shortCode').focus();
  }
});

// Settings toggle
document.getElementById('settingsToggle').addEventListener('click', () => {
  document.getElementById('settingsPanel').classList.toggle('active');
});

// Save settings
document.getElementById('saveSettings').addEventListener('click', async () => {
  const apiKey = document.getElementById('apiKey').value.trim();

  if (!apiKey) {
    showResult('Please enter an API key', 'error');
    return;
  }

  await chrome.storage.sync.set({ apiKey });
  showResult('Settings saved!', 'success');

  setTimeout(() => {
    document.getElementById('settingsPanel').classList.remove('active');
  }, 1000);
});

// Shorten URL button
document.getElementById('shortenBtn').addEventListener('click', shortenUrl);

// Allow Enter key to submit
document.getElementById('url').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') shortenUrl();
});
document.getElementById('shortCode').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') shortenUrl();
});

async function shortenUrl() {
  const urlInput = document.getElementById('url').value.trim();
  const shortCodeInput = document.getElementById('shortCode').value.trim();
  const button = document.getElementById('shortenBtn');

  // Validate URL
  if (!urlInput) {
    showResult('Please enter a URL', 'error');
    return;
  }

  if (!urlInput.startsWith('http://') && !urlInput.startsWith('https://')) {
    showResult('URL must start with http:// or https://', 'error');
    return;
  }

  // Get API key
  const { apiKey } = await chrome.storage.sync.get('apiKey');
  if (!apiKey) {
    showResult('Please set your API key in settings', 'error');
    document.getElementById('settingsPanel').classList.add('active');
    return;
  }

  // Disable button
  button.disabled = true;
  button.textContent = 'Shortening...';

  try {
    const response = await fetch('https://chom.pm/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify({
        url: urlInput,
        ...(shortCodeInput && { shortCode: shortCodeInput })
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      const shortUrl = data.shortUrl;

      // Copy to clipboard
      await navigator.clipboard.writeText(shortUrl);

      // Show result
      document.getElementById('resultUrl').textContent = shortUrl;
      document.getElementById('resultUrl').onclick = () => {
        window.open(shortUrl, '_blank');
      };
      showResult('', 'success');

      // Clear short code input for next use
      document.getElementById('shortCode').value = '';

      // Optional: Close popup after 2 seconds
      // setTimeout(() => window.close(), 2000);
    } else {
      showResult(data.error || 'Failed to shorten URL', 'error');
    }
  } catch (error) {
    showResult('Network error: ' + error.message, 'error');
  } finally {
    button.disabled = false;
    button.textContent = 'Shorten URL';
  }
}

function showResult(message, type) {
  const resultDiv = document.getElementById('result');
  const resultUrl = document.getElementById('resultUrl');

  if (message) {
    resultUrl.textContent = message;
    resultDiv.className = 'result ' + type;
  } else {
    resultDiv.className = 'result ' + type;
  }
}
