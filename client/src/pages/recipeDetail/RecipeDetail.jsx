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
			<p>
				<strong>Difficulty:</strong> {recipe.difficulty}
			</p>
			<p>
				<strong>Time:</strong> {recipe.time.hours}h {recipe.time.minutes}m
			</p>
			<p>
				<strong>Specialties:</strong> {recipe.specialties.join(', ')}
			</p>
			<p>
				<strong>Course:</strong> {recipe.course}
			</p>
			<p>
				<strong>Meal Type:</strong> {recipe.mealType}
			</p>

			<h2>Ingredients</h2>
			{recipe.ingredients.length > 0 ? (
				<table>
					<thead>
						<tr>
							<th>Amount</th>
							<th>Unit</th>
							<th>Ingredient</th>
						</tr>
					</thead>
					<tbody>
						{recipe.ingredients.map((ingredient, index) => (
							<tr key={index}>
								<td>{ingredient.amount}</td>
								<td>{ingredient.unit}</td>
								<td>{ingredient.ingredient}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No ingredients available.</p>
			)}

			<h2>Steps</h2>
			{recipe.steps.length > 0 ? (
				<ol>
					{recipe.steps.map((step, index) => (
						<li key={index}>{step.text}</li>
					))}
				</ol>
			) : (
				<p>No steps available.</p>
			)}
		</div>
	);
};

export default RecipeDetail;
