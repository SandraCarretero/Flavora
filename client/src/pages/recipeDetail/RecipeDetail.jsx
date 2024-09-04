import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/api';
import {
	StyledDetails,
	StyledDetailsImg,
	StyledHr,
	StyledImage,
	StyledList,
	StyledPhotoBox,
	StyledPhotoUpload,
	StyledRecipeDetails,
	StyledSection,
	StyledSpecials,
	StyledTop
} from './recipeDetail.styles';

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
		<StyledSection>
			<StyledTop>
				<StyledPhotoUpload>
					<StyledPhotoBox>
						<StyledImage src={recipe.image} alt={recipe.name} />
					</StyledPhotoBox>
				</StyledPhotoUpload>
				<StyledRecipeDetails>
					<h1>{recipe.name}</h1>
					<span>
						{recipe.course} | {recipe.mealType}
					</span>
					<StyledDetails>
						<StyledDetailsImg src='/images/dificultad.svg' alt='' />
						{recipe.difficulty}
					</StyledDetails>
					<StyledDetails>
						<StyledDetailsImg src='/images/reloj.svg' alt='' />
						{recipe.time.hours}h {recipe.time.minutes}m
					</StyledDetails>
					<StyledDetails>
						<StyledDetailsImg src='/images/slice.svg' alt='' />
						{recipe.slice}
					</StyledDetails>
					<StyledDetails>
						{recipe.specialties.map((specialty, index) => (
							<StyledSpecials key={index}>{specialty}</StyledSpecials>
						))}
					</StyledDetails>
				</StyledRecipeDetails>
			</StyledTop>

			<StyledHr />

			<h2>Ingredientes</h2>
			{recipe.ingredients.length > 0 ? (
				<div>
					{recipe.ingredients.map((ingredient, index) => (
						<p key={index}>
							<span>{ingredient.amount} </span>
							<span>{ingredient.unit} </span>
							<span>{ingredient.ingredient}</span>
						</p>
					))}
				</div>
			) : (
				<p>No ingredients available.</p>
			)}

			<StyledHr />

			<h2>Pasos</h2>
			{recipe.steps.length > 0 ? (
				<StyledList>
					{recipe.steps.map((step, index) => (
						<p key={index}>
							<li>{step.text}</li>
						</p>
					))}
				</StyledList>
			) : (
				<p>No steps available.</p>
			)}
		</StyledSection>
	);
};

export default RecipeDetail;
