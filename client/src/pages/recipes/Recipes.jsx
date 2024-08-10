import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { StyledButton, StyledRatingInput } from './recipes.styles';

const Recipes = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [userRating, setUserRating] = useState(0);
  
    useEffect(() => {
      const fetchRecipe = async () => {
        try {
          const response = await fetch(`/api/recipes/${id}`);
          if (response.ok) {
            const data = await response.json();
            setRecipe(data);
          } else {
            console.error('Error al obtener la receta');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      fetchRecipe();
    }, [id]);
  
    const handleRatingSubmit = async () => {
      try {
        const response = await fetch(`/api/recipes/rating/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating: userRating }),
        });
  
        if (response.ok) {
          const updatedRecipe = await response.json();
          setRecipe(updatedRecipe);
          setUserRating(0);
        } else {
          console.error('Error al enviar la valoración');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div>
        {recipe && (
          <>
            <h1>{recipe.name}</h1>
            <p>Dificultad: {recipe.difficulty}</p>
            <p>Tiempo: {recipe.time}</p>
            <p>Especialidades: {recipe.specialties.join(', ')}</p>
            <p>Tipo de plato: {recipe.course}</p>
            <p>Tipo de comida: {recipe.mealType}</p> {/* Actualizado */}
            <p>Pasos a seguir: {recipe.steps}</p>
            <p>Valoración: {recipe.rating.toFixed(1)} ({recipe.ratingsCount} valoraciones)</p>
  
            <StyledRatingInput
              type='number'
              placeholder='Tu valoración (1-5)'
              min='1'
              max='5'
              value={userRating}
              onChange={e => setUserRating(Number(e.target.value))}
            />
            <StyledButton onClick={handleRatingSubmit}>Enviar Valoración</StyledButton>
          </>
        )}
      </div>
    );
  };
  

export default Recipes;
