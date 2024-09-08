import { useState, useEffect } from 'react';
import { getData } from '../../utils/api';

import Card from '../../components/card/Card';
import {
	StyledFilter,
	StyledFilterContainer,
	StyledMealsContainer,
	StylesMeals
} from './specials.styles';

const Specials = () => {
	const [recipes, setRecipes] = useState([]);
	const [filteredRecipes, setFilteredRecipes] = useState([]);
	const [selectedSpecials, setSelectedSpecials] = useState('');
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await getData('http://localhost:3000/api/recipes');
				console.log('API Response:', response); // Registra la respuesta de la API

				if (response.error) {
					setError(response.error);
					console.error('Error fetching recipes:', response.error);
				} else {
					if (Array.isArray(response)) {
						setRecipes(response);
						setFilteredRecipes(response); // Inicialmente, muestra todas las recetas
					} else {
						setError('Unexpected response format');
						console.error('Unexpected response format:', response);
					}
				}
			} catch (error) {
				setError(error.message);
				console.error('Error fetching recipes:', error);
			}
		};

		fetchRecipes();
	}, []);

	useEffect(() => {
		console.log('Selected Special:', selectedSpecials); // Registra la especialidad seleccionada
		console.log('All Recipes:', recipes); // Registra todas las recetas

		if (selectedSpecials) {
			const filtered = recipes.filter(
				recipe =>
					recipe.specialties &&
					recipe.specialties.some(
						specialty =>
							specialty.toLowerCase() === selectedSpecials.toLowerCase()
					)
			);
			console.log('Filtered Recipes:', filtered); // Registra las recetas filtradas
			setFilteredRecipes(filtered);
		} else {
			setFilteredRecipes(recipes); // Si no hay filtro, muestra todas las recetas
		}
	}, [selectedSpecials, recipes]);

	const handleSpecialsChange = event => {
		setSelectedSpecials(event.target.value);
	};

	return (
		<StylesMeals>
			<StyledFilterContainer>
				<StyledFilter value={selectedSpecials} onChange={handleSpecialsChange}>
					<option value=''>Todos</option>
					<option value='Sin gluten'>Sin gluten</option>
					<option value='Vegetariano'>Vegetariano</option>
					<option value='Vegano'>Vegano</option>
				</StyledFilter>
			</StyledFilterContainer>
			<StyledMealsContainer>
				{error ? (
					<p>Error: {error}</p>
				) : filteredRecipes.length > 0 ? (
					filteredRecipes.map(recipe => (
						<Card key={recipe._id} recipe={recipe} />
					))
				) : (
					<p>No recipes found.</p>
				)}
			</StyledMealsContainer>
		</StylesMeals>
	);
};

export default Specials;
