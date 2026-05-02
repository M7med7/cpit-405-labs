import { Routes, Route, Link } from 'react-router-dom'
import Search from './pages/Search'
import RecipeDetails from './pages/RecipeDetails'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header>
        <h1 className="lab-title">Lab 9</h1>
        <h2 className="lab-subtitle">Lab 09: Working with APIs in React.js</h2>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </main>

      <footer>
        <p>CPIT-405 | React Examples</p>
      </footer>
    </div>
  )
}

export default App
