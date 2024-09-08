import { useState, useEffect } from 'react';
import { getData } from '../../utils/api';

import Card from '../../components/card/Card';
import {
	StyledFilter,
	StyledFilterContainer,
	StyledMealsContainer,
	StylesMeals
} from './meals.styles';

const Meals = () => {
	const [recipes, setRecipes] = useState([]);
	const [filteredRecipes, setFilteredRecipes] = useState([]);
	const [selectedMeal, setSelectedMeal] = useState('');
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await getData('http://localhost:3000/api/recipes');
				console.log('API Response:', response);

				if (response.error) {
					setError(response.error);
					console.error('Error fetching recipes:', response.error);
				} else {
					if (Array.isArray(response)) {
						setRecipes(response);
						setFilteredRecipes(response);
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
		console.log('Selected Course:', selectedMeal);
		console.log('All Recipes:', recipes);
		if (selectedMeal) {
			const filtered = recipes.filter(
				recipe =>
					recipe.mealType &&
					recipe.mealType.toLowerCase() === selectedMeal.toLowerCase()
			);
			console.log('Filtered Recipes:', filtered);
			setFilteredRecipes(filtered);
		} else {
			setFilteredRecipes(recipes);
		}
	}, [selectedMeal, recipes]);

	const handleMealChange = event => {
		setSelectedMeal(event.target.value);
	};

	return (
		<StylesMeals>
			<StyledFilterContainer>
				<StyledFilter value={selectedMeal} onChange={handleMealChange}>
					<option value=''>Todos</option>
					<option value='Carne'>Carne</option>
					<option value='Pollo'>Pollo</option>
					<option value='Ensalada'>Ensalada</option>
					<option value='Pescado'>Pescado</option>
					<option value='Puré'>Puré</option>
					<option value='Patatas'>Patatas</option>
					<option value='Verdura'>Verdura</option>
					<option value='Pasta'>Pasta</option>
					<option value='Arroz'>Arroz</option>
					<option value='Postre'>Postre</option>
					<option value='Batido'>Batido</option>
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

export default Meals;
