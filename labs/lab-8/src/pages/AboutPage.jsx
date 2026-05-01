import "./AboutPage.css";

/**
 * AboutPage — static informational page describing the Link Shrinker app.
 * Accessed via the "/about" route.
 */
function AboutPage() {
  return (
    <main className="about">
      <section className="about__card" aria-labelledby="about-heading">
        <h1 id="about-heading" className="about__title">
          About Us
        </h1>

        <p className="about__text">
          <strong>Link Shrinker</strong> is a simple and fast URL-shortening
          tool built as part of CPIT-405 Lab 8. The application demonstrates
          core React.js concepts including state management with{" "}
          <code>useState</code>, event handling, and client-side routing with
          React Router.
        </p>

        <h2 className="about__subtitle">Features</h2>
        <ul className="about__features">
          <li className="about__feature-item">
            <span className="about__feature-icon" aria-hidden="true">🔗</span>
            <span>
              <strong>URL Shortening</strong> — Paste any long URL and get a
              concise, shareable link instantly.
            </span>
          </li>
          <li className="about__feature-item">
            <span className="about__feature-icon" aria-hidden="true">✏️</span>
            <span>
              <strong>Custom Short Codes</strong> — Choose your own memorable
              short code instead of a randomly generated one.
            </span>
          </li>
          <li className="about__feature-item">
            <span className="about__feature-icon" aria-hidden="true">📋</span>
            <span>
              <strong>One-Click Copy</strong> — Copy the shortened URL to your
              clipboard with a single click.
            </span>
          </li>
        </ul>

        <h2 className="about__subtitle">Technology Stack</h2>
        <ul className="about__tech-list">
          <li>React 19 (Vite)</li>
          <li>React Router v7</li>
          <li>Vanilla CSS with custom properties</li>
        </ul>

        <p className="about__footer-text">
          Built with ❤️ for CPIT-405 — Web Application Engineering.
        </p>
      </section>
    </main>
  );
}

export default AboutPage;
