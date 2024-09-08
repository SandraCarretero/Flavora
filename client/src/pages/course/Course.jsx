import { useState, useEffect } from 'react';
import { getData } from '../../utils/api';

import Card from '../../components/card/Card';
import {
	StyledFilter,
	StyledFilterContainer,
	StyledMealsContainer,
	StylesMeals
} from './course.styles';

const Course = () => {
	const [recipes, setRecipes] = useState([]);
	const [filteredRecipes, setFilteredRecipes] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState('');
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
		console.log('Selected Course:', selectedCourse); 
		console.log('All Recipes:', recipes); 
		if (selectedCourse) {
			const filtered = recipes.filter(
				recipe =>
					recipe.course &&
					recipe.course.toLowerCase() === selectedCourse.toLowerCase()
			);
			console.log('Filtered Recipes:', filtered); 
			setFilteredRecipes(filtered);
		} else {
			setFilteredRecipes(recipes);
		}
	}, [selectedCourse, recipes]);

	const handleCourseChange = event => {
		setSelectedCourse(event.target.value);
	};

	return (
		<StylesMeals>
			<StyledFilterContainer>
				<StyledFilter value={selectedCourse} onChange={handleCourseChange}>
					<option value=''>Todos</option>
					<option value='Desayuno'>Desayuno</option>
					<option value='Entrante'>Entrante</option>
					<option value='Acompañamiento'>Acompañamiento</option>
					<option value='Primer plato'>Primer plato</option>
					<option value='Postre'>Postre</option>
					<option value='Tentempié'>Tentempié</option>
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

export default Course;
