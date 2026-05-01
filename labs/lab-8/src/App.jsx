import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

/**
 * App — root component.
 *
 * Composes the layout:
 *  1. A persistent <Navbar> for navigation (visible on all pages).
 *  2. A <Routes> block that swaps page content based on the current URL.
 *
 * React Router concepts demonstrated:
 *  - <Routes> / <Route> for declarative route definitions
 *  - <NavLink> (inside Navbar) for active-link highlighting
 */
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
