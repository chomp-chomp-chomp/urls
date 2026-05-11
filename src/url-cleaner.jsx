import { useState, useCallback, useRef } from “react”;

const TRACKING_PARAMS = new Set([
// UTM
“utm_source”, “utm_medium”, “utm_campaign”, “utm_term”, “utm_content”,
“utm_id”, “utm_source_platform”, “utm_campaign_id”, “utm_creative_format”,
“utm_marketing_tactic”,
// Klaviyo
“_kx”, “uid”, “campaign_id”,
// Facebook
“fbclid”, “fb_action_ids”, “fb_action_types”, “fb_source”, “fb_ref”,
// Google
“gclid”, “gclsrc”, “dclid”, “gbraid”, “wbraid”,
// Microsoft/Bing
“msclkid”,
// Twitter/X
“twclid”,
// HubSpot
“hsa_acc”, “hsa_cam”, “hsa_grp”, “hsa_ad”, “hsa_src”, “hsa_tgt”,
“hsa_kw”, “hsa_mt”, “hsa_net”, “hsa_ver”, “hsa_la”,
// Mailchimp
“mc_cid”, “mc_eid”,
// Marketo
“mkt_tok”,
// Iterable
“messageId”,
// Generic tracking
“ref”, “referrer”, “source”, “campaign”, “trk”, “trkinfo”,
“igshid”, “s_cid”, “ncid”, “cid”, “eid”, “mid”,
“clickid”, “click_id”, “track”, “tracking”,
“affiliate”, “aff_id”, “partner_id”,
“zanpid”, “origin”, “sxsrf”,
]);

// ── Change these to match your deployment ──────────────────────────────────
const DEFAULT_WORKER_URL = “https://chomp-urls.YOUR-SUBDOMAIN.workers.dev”;
// ──────────────────────────────────────────────────────────────────────────

function cleanUrl(raw) {
const trimmed = raw.trim();
if (!trimmed) return { cleaned: “”, removed: [] };
let url;
try {
url = new URL(trimmed);
} catch {
return { cleaned: trimmed, removed: [], error: “Not a valid URL” };
}
const removed = [];
const toDelete = [];
for (const [key] of url.searchParams) {
if (TRACKING_PARAMS.has(key.toLowerCase())) {
toDelete.push(key);
removed.push(key);
}
}
toDelete.forEach(k => url.searchParams.delete(k));
let cleaned = url.toString();
if (url.searchParams.size === 0) cleaned = cleaned.replace(/?$/, “”);
return { cleaned, removed };
}

async function shortenUrl(cleanedUrl, workerUrl, apiKey, customCode) {
const endpoint = `${workerUrl.replace(/\/$/, "")}/api/shorten`;
const body = { url: cleanedUrl };
if (customCode.trim()) body.shortCode = customCode.trim();

const res = await fetch(endpoint, {
method: “POST”,
headers: {
“Content-Type”: “application/json”,
“X-API-Key”: apiKey,
},
body: JSON.stringify(body),
});

const data = await res.json();
if (!res.ok || !data.success) {
throw new Error(data.error || `HTTP ${res.status}`);
}
return data.shortUrl;
}

export default function UrlCleaner() {
const [input, setInput] = useState(””);
const [result, setResult] = useState(null);
const [copied, setCopied] = useState(false);
const [shortUrl, setShortUrl] = useState(null);
const [shortCopied, setShortCopied] = useState(false);
const [shortening, setShortening] = useState(false);
const [shortenError, setShortenError] = useState(null);
const [customCode, setCustomCode] = useState(””);
const [showSettings, setShowSettings] = useState(false);
const [workerUrl, setWorkerUrl] = useState(DEFAULT_WORKER_URL);
const [apiKey, setApiKey] = useState(””);
const apiKeyRef = useRef(null);

const handleClean = useCallback(() => {
if (!input.trim()) return;
const r = cleanUrl(input);
setResult(r);
setCopied(false);
setShortUrl(null);
setShortenError(null);
setCustomCode(””);
}, [input]);

const handlePaste = useCallback((e) => {
const pasted = e.clipboardData.getData(“text”);
if (pasted.trim()) {
setTimeout(() => {
const r = cleanUrl(pasted.trim());
setInput(pasted.trim());
setResult(r);
setCopied(false);
setShortUrl(null);
setShortenError(null);
setCustomCode(””);
}, 0);
}
}, []);

const handleKeyDown = (e) => {
if (e.key === “Enter” && (e.metaKey || e.ctrlKey)) handleClean();
};

const handleCopy = useCallback((text, setter) => {
navigator.clipboard.writeText(text).then(() => {
setter(true);
setTimeout(() => setter(false), 2000);
});
}, []);

const handleShorten = useCallback(async () => {
if (!result?.cleaned || shortening) return;
if (!apiKey.trim()) {
setShowSettings(true);
setTimeout(() => apiKeyRef.current?.focus(), 100);
return;
}
setShortening(true);
setShortenError(null);
setShortUrl(null);
try {
const s = await shortenUrl(result.cleaned, workerUrl, apiKey, customCode);
setShortUrl(s);
} catch (err) {
setShortenError(err.message);
} finally {
setShortening(false);
}
}, [result, workerUrl, apiKey, customCode, shortening]);

const canShorten = result?.cleaned && !result?.error;

return (
<div style={{
minHeight: “100vh”,
background: “#0a0a0a”,
display: “flex”,
alignItems: “center”,
justifyContent: “center”,
fontFamily: “‘DM Mono’, ‘Fira Mono’, ‘Courier New’, monospace”,
padding: “2rem”,
}}>
<style>{`
@import url(‘https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Bebas+Neue&display=swap’);
* { box-sizing: border-box; }

```
    .container { width: 100%; max-width: 680px; }
    .header { margin-bottom: 2.5rem; }

    .title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(2.8rem, 8vw, 5rem);
      letter-spacing: 0.04em;
      color: #f0f0f0;
      line-height: 0.9;
      margin: 0 0 0.5rem 0;
    }
    .title span { color: #fe0032; }

    .settings-toggle {
      background: transparent;
      border: 1px solid #222;
      border-radius: 3px;
      color: #444;
      font-family: 'DM Mono', monospace;
      font-size: 0.6rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 0.35rem 0.6rem;
      cursor: pointer;
      margin-top: 0.5rem;
      transition: all 0.15s;
    }
    .settings-toggle:hover { border-color: #444; color: #888; }
    .settings-toggle.active { border-color: #fe0032; color: #fe0032; }

    .settings-panel {
      background: #0f0f0f;
      border: 1px solid #1e1e1e;
      border-radius: 4px;
      padding: 1rem;
      margin-bottom: 1.25rem;
      animation: fadeUp 0.15s ease;
    }

    .settings-row { display: flex; flex-direction: column; gap: 0.75rem; }

    .field-label {
      font-size: 0.6rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #444;
      margin-bottom: 0.3rem;
    }

    .settings-input {
      width: 100%;
      background: #141414;
      border: 1px solid #2a2a2a;
      border-radius: 3px;
      color: #c8c8c8;
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      padding: 0.5rem 0.7rem;
      outline: none;
      transition: border-color 0.15s;
    }
    .settings-input:focus { border-color: #444; }
    .settings-input::placeholder { color: #2e2e2e; }

    .subtitle {
      font-size: 0.72rem;
      color: #555;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin: 0;
    }

    .divider { width: 2rem; height: 2px; background: #fe0032; margin: 1rem 0; }

    textarea {
      width: 100%;
      background: #111;
      border: 1px solid #2a2a2a;
      border-radius: 4px;
      color: #c8c8c8;
      font-family: 'DM Mono', monospace;
      font-size: 0.8rem;
      padding: 1rem;
      resize: none;
      outline: none;
      transition: border-color 0.15s;
      line-height: 1.6;
      min-height: 110px;
      margin-bottom: 0.5rem;
    }
    textarea::placeholder { color: #333; }
    textarea:focus { border-color: #444; }

    .paste-hint {
      font-size: 0.65rem;
      color: #333;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 0.75rem;
      text-align: right;
    }

    .clean-btn {
      width: 100%;
      background: #fe0032;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1.3rem;
      letter-spacing: 0.1em;
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      transition: background 0.15s, transform 0.08s;
    }
    .clean-btn:hover { background: #cc0028; }
    .clean-btn:active { transform: scale(0.99); }
    .clean-btn:disabled { background: #2a0010; color: #550015; cursor: default; }

    .result-box {
      margin-top: 1.5rem;
      border: 1px solid #1e1e1e;
      border-radius: 4px;
      overflow: hidden;
      animation: fadeUp 0.2s ease;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .result-label {
      font-size: 0.6rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #444;
      background: #111;
      padding: 0.5rem 0.85rem;
      border-bottom: 1px solid #1e1e1e;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .result-label .status { color: #4ade80; font-size: 0.6rem; letter-spacing: 0.12em; }

    .result-url {
      background: #0d0d0d;
      padding: 1rem;
      color: #e0e0e0;
      font-size: 0.78rem;
      line-height: 1.7;
      word-break: break-all;
      user-select: all;
    }

    .result-actions {
      background: #111;
      padding: 0.6rem 0.85rem;
      border-top: 1px solid #1e1e1e;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .removed-list {
      font-size: 0.62rem;
      color: #555;
      letter-spacing: 0.04em;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
    .removed-list .count { color: #fe0032; margin-right: 0.4em; }

    .action-btns { display: flex; gap: 0.5rem; flex-shrink: 0; }

    .copy-btn, .shorten-btn {
      background: transparent;
      border: 1px solid #2a2a2a;
      border-radius: 3px;
      color: #888;
      font-family: 'DM Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 0.35rem 0.75rem;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .copy-btn:hover { border-color: #555; color: #ccc; }
    .copy-btn.copied { border-color: #4ade80; color: #4ade80; }
    .shorten-btn { border-color: #2a1a00; color: #664400; }
    .shorten-btn:hover { border-color: #cc7700; color: #cc7700; }
    .shorten-btn:disabled { opacity: 0.4; cursor: default; }

    .shorten-section {
      border-top: 1px solid #1a1a1a;
      background: #0d0d0d;
      animation: fadeUp 0.2s ease;
    }

    .custom-code-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 0.85rem;
      border-bottom: 1px solid #151515;
    }

    .custom-code-label {
      font-size: 0.6rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #333;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .custom-code-input {
      flex: 1;
      background: transparent;
      border: none;
      border-bottom: 1px solid #222;
      color: #c8c8c8;
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      padding: 0.2rem 0.3rem;
      outline: none;
      transition: border-color 0.15s;
      min-width: 0;
    }
    .custom-code-input:focus { border-bottom-color: #444; }
    .custom-code-input::placeholder { color: #2a2a2a; }

    .short-result {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.75rem 0.85rem;
      flex-wrap: wrap;
    }

    .short-url-text {
      font-size: 0.8rem;
      color: #cc7700;
      word-break: break-all;
      flex: 1;
      min-width: 0;
    }

    .shorten-error {
      padding: 0.6rem 0.85rem;
      font-size: 0.7rem;
      color: #fe0032;
    }

    .no-api-hint {
      font-size: 0.62rem;
      color: #333;
      letter-spacing: 0.06em;
      padding: 0 0.85rem 0.6rem;
    }
    .no-api-hint span {
      color: #fe0032;
      cursor: pointer;
      text-decoration: underline;
    }

    .error-note { font-size: 0.7rem; color: #fe0032; padding: 0.75rem 0.85rem; }
  `}</style>

  <div className="container">
    <div className="header">
      <div className="title-row">
        <h1 className="title">URL<span>.</span><br />STRIP</h1>
        <button
          className={`settings-toggle${showSettings ? " active" : ""}`}
          onClick={() => setShowSettings(s => !s)}
        >
          {showSettings ? "✕ Close" : "⚙ Settings"}
        </button>
      </div>
      <div className="divider" />
      <p className="subtitle">Strip tracking · Shorten via chom.pm</p>
    </div>

    {showSettings && (
      <div className="settings-panel">
        <div className="settings-row">
          <div>
            <div className="field-label">Worker URL</div>
            <input
              className="settings-input"
              value={workerUrl}
              onChange={e => setWorkerUrl(e.target.value)}
              placeholder="https://chomp-urls.YOUR-SUBDOMAIN.workers.dev"
              spellCheck={false}
            />
          </div>
          <div>
            <div className="field-label">API Key</div>
            <input
              ref={apiKeyRef}
              className="settings-input"
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="your-api-key"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    )}

    <textarea
      value={input}
      onChange={e => setInput(e.target.value)}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      placeholder="Paste a URL here…"
      spellCheck={false}
    />

    <div className="paste-hint">⌘ + Enter to clean</div>

    <button
      className="clean-btn"
      onClick={handleClean}
      disabled={!input.trim()}
    >
      Strip It
    </button>

    {result && (
      <div className="result-box">
        <div className="result-label">
          <span>Cleaned URL</span>
          {result.removed.length === 0 && !result.error && (
            <span className="status">✓ Already clean</span>
          )}
          {result.removed.length > 0 && (
            <span className="status">{result.removed.length} param{result.removed.length !== 1 ? "s" : ""} removed</span>
          )}
        </div>

        {result.error ? (
          <div className="error-note">{result.error}</div>
        ) : (
          <>
            <div className="result-url">{result.cleaned}</div>

            <div className="result-actions">
              <div className="removed-list">
                {result.removed.length > 0 ? (
                  <><span className="count">—</span>{result.removed.join(", ")}</>
                ) : (
                  <span style={{ color: "#333" }}>No tracking params found</span>
                )}
              </div>
              <div className="action-btns">
                <button
                  className={`copy-btn${copied ? " copied" : ""}`}
                  onClick={() => handleCopy(result.cleaned, setCopied)}
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
                {canShorten && (
                  <button
                    className={`shorten-btn${shortening ? " loading" : ""}`}
                    onClick={handleShorten}
                    disabled={shortening}
                  >
                    {shortening ? "…" : "Shorten"}
                  </button>
                )}
              </div>
            </div>

            {canShorten && !apiKey.trim() && !shortUrl && (
              <div className="no-api-hint">
                No API key set —{" "}
                <span onClick={() => { setShowSettings(true); setTimeout(() => apiKeyRef.current?.focus(), 100); }}>
                  add one in settings
                </span>
                {" "}to enable shortening.
              </div>
            )}

            {(shortUrl || shortenError || shortening) && (
              <div className="shorten-section">
                <div className="custom-code-row">
                  <span className="custom-code-label">Short code</span>
                  <input
                    className="custom-code-input"
                    value={customCode}
                    onChange={e => setCustomCode(e.target.value)}
                    placeholder="optional — leave blank for random"
                    spellCheck={false}
                  />
                </div>

                {shortenError && (
                  <div className="shorten-error">Error: {shortenError}</div>
                )}

                {shortUrl && (
                  <div className="short-result">
                    <span className="short-url-text">{shortUrl}</span>
                    <button
                      className={`copy-btn${shortCopied ? " copied" : ""}`}
                      onClick={() => handleCopy(shortUrl, setShortCopied)}
                    >
                      {shortCopied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    )}
  </div>
</div>
```

);
}
