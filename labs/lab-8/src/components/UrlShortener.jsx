import { useState } from "react";
import "./UrlShortener.css";

/** Base domain used for generating shortened links. */
const SHORT_DOMAIN = "https://cpt405.co";

/**
 * UrlShortener — the main URL-shortening form component.
 *
 * React concepts demonstrated:
 * - useState   → manages longUrl, shortCode, and shortenedUrl state
 * - Event handling → form submission & input change handlers
 *
 * The shortening is performed client-side for this lab exercise.
 * In production this would call a backend API.
 */
function UrlShortener() {
  /* -------- State -------- */
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  /* -------- Derived -------- */
  const isFormValid = longUrl.trim() !== "";

  /* -------- Helpers -------- */

  /**
   * Generate a random alphanumeric code of a given length.
   * Used as fallback when the user doesn't provide a custom short code.
   */
  const generateRandomCode = (length = 6) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  /**
   * Basic URL validation — ensures the input looks like a valid URL.
   */
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  /* -------- Event Handlers -------- */

  /**
   * Handle form submission.
   * Validates the long URL, determines the short code, and
   * produces the shortened URL string.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setCopied(false);

    // Validate long URL
    if (!isValidUrl(longUrl)) {
      setError("Please enter a valid URL (e.g. https://example.com).");
      setShortenedUrl("");
      return;
    }

    // Use the custom code or generate a random one
    const code = shortCode.trim() !== "" ? shortCode.trim() : generateRandomCode();
    const result = `${SHORT_DOMAIN}/${code}`;
    setShortenedUrl(result);
  };

  /**
   * Copy the shortened URL to the clipboard.
   */
  const handleCopy = async () => {
    if (!shortenedUrl) return;
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard API might be blocked in certain contexts */
      setError("Unable to copy. Please copy the link manually.");
    }
  };

  /* -------- Render -------- */
  return (
    <section className="shortener" aria-labelledby="shortener-heading">
      <h1 id="shortener-heading" className="shortener__title">
        Link Shrinker
      </h1>

      <form
        id="shorten-form"
        className="shortener__form"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Long URL Input */}
        <div className="shortener__field">
          <label htmlFor="long-url" className="shortener__label">
            Long URL:
          </label>
          <input
            id="long-url"
            type="url"
            className="shortener__input"
            placeholder="https://react.dev/learn/reusing-logic-with-custom-hooks"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
            autoComplete="url"
          />
        </div>

        {/* Custom Short Code Input */}
        <div className="shortener__field">
          <label htmlFor="short-code" className="shortener__label">
            Enter short code:
          </label>
          <input
            id="short-code"
            type="text"
            className="shortener__input"
            placeholder="react101"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            autoComplete="off"
          />
        </div>

        {/* Error message */}
        {error && (
          <p id="form-error" className="shortener__error" role="alert">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          id="shorten-btn"
          type="submit"
          className="shortener__button"
          disabled={!isFormValid}
        >
          Shorten
        </button>
      </form>

      {/* Result */}
      {shortenedUrl && (
        <div className="shortener__result" aria-live="polite">
          <h2 className="shortener__result-heading">Short URL</h2>
          <div className="shortener__result-row">
            <a
              id="shortened-url"
              className="shortener__result-link"
              href={longUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Redirects to: ${longUrl}`}
            >
              {shortenedUrl}
            </a>
            <button
              id="copy-btn"
              type="button"
              className="shortener__copy-btn"
              onClick={handleCopy}
              aria-label="Copy shortened URL"
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default UrlShortener;
