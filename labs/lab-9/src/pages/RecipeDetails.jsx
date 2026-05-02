import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }

        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div className="recipe-details-container"><p>Loading recipe...</p></div>;
  if (error) return <div className="recipe-details-container"><p className="error">{error}</p></div>;
  if (!recipe) return <div className="recipe-details-container"><p>Recipe not found.</p></div>;

  return (
    <div className="recipe-details-container">
      <h2 className="recipe-title-large">{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="recipe-detail-image" />
      
      <p className="recipe-summary" dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
      
      <div className="recipe-info">
        <h3>Ingredients</h3>
        <ul>
          {recipe.extendedIngredients?.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>

        <h3>Instructions</h3>
        {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
          <ol>
            {recipe.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ol>
        ) : (
           <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;
