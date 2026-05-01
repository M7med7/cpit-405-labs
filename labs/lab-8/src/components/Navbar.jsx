import { NavLink } from "react-router-dom";
import "./Navbar.css";

/**
 * Navbar — top-level navigation bar.
 * Uses React Router <NavLink> for client-side routing.
 * Active links are highlighted automatically via the "active" class.
 */
function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <ul className="navbar__list">
        <li>
          <NavLink
            id="nav-home"
            to="/"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            id="nav-about"
            to="/about"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
          >
            About us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
