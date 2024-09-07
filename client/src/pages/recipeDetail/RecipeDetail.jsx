import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { deleteData, getData } from '../../utils/api';
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
	StyledTop,
	StyledMenuIcon,
	StyledMenuOptions,
	StyledMenuOptionBtn
} from './recipeDetail.styles';
import { AuthContext } from '../../context/Auth.context';

const RecipeDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [recipe, setRecipe] = useState(null);
	const [error, setError] = useState(null);
	const [menuOpen, setMenuOpen] = useState(false);

	const { userLogged } = useContext(AuthContext);

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

	const isRecipeOwner = userLogged && recipe.userId === userLogged.uid;

	return (
		<StyledSection>
			<StyledTop>
				<StyledPhotoUpload>
					<StyledPhotoBox $hasImage={!!recipe.image}>
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
				{isRecipeOwner && (
					<StyledMenuIcon
						onClick={() => handleMenuToggle(setMenuOpen, menuOpen)}
					>
						<img src='/images/puntos.svg' alt='Menu' />
					</StyledMenuIcon>
				)}

				{menuOpen && (
					<StyledMenuOptions>
						<StyledMenuOptionBtn onClick={() => handleEdit(navigate, id)}>
							<img src='/images/edit.svg' alt='Editar' /> Editar
						</StyledMenuOptionBtn>
						<StyledMenuOptionBtn onClick={() => handleDelete(navigate, id)}>
							<img src='/images/delete.svg' alt='Borrar' /> Borrar
						</StyledMenuOptionBtn>
					</StyledMenuOptions>
				)}
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

const handleMenuToggle = (setMenuOpen, menuOpen) => {
	setMenuOpen(!menuOpen);
};

const handleEdit = (navigate, id) => {
	navigate(`/editRecipe/${id}`);
};

const handleDelete = async (navigate, id) => {
	try {
		await deleteData(`http://localhost:3000/api/recipes/${id}`);
		navigate('/profile');
	} catch (error) {
		console.error('Error al eliminar receta:', error);
	}
};

export default RecipeDetail;
