import { useState } from 'react';
import { Link } from 'react-router-dom';

function Search() {
  const [query, setQuery] = useState('pasta');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchRecipes = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError('');
    
    try {
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      setRecipes(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <form onSubmit={searchRecipes} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="search-input"
        />
        <button type="submit" className="search-button">SEARCH</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <h3 className="recipe-title">{recipe.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
