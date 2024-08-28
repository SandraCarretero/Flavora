import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/api';

const RecipeDetail = () => {
	const { id } = useParams(); // Obtener el ID de la receta desde la URL
	const [recipe, setRecipe] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await getData(
					`http://localhost:3000/api/recipes/${id}`
				);
				if (response.error) {
					setError(response.error);
					console.error('Error fetching recipe:', response.error);
				} else {
					setRecipe(response);
				}
			} catch (error) {
				setError(error.message);
				console.error('Error fetching recipe:', error);
			}
		};

		fetchRecipe();
	}, [id]);

	if (error) return <p>Error: {error}</p>;
	if (!recipe) return <p>Loading...</p>;

	return (
		<div>
			<h1>{recipe.name}</h1>
			<p>Difficulty: {recipe.difficulty}</p>
			<p>Time: {recipe.time}</p>
			<p>Specialties: {recipe.specialties.join(', ')}</p>
			<p>Course: {recipe.course}</p>
			<p>Meal Type: {recipe.mealType}</p>
			<p>Steps: {recipe.steps}</p>
			{/* Otros detalles de la receta */}
		</div>
	);
};

export default RecipeDetail;
