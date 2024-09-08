import { useEffect, useState } from 'react';
import Card from '../card/Card';
import { StyledCards, StyledFavourite, StyledTitle } from './favourite.styles';
import { getData } from '../../utils/api';

const Favourite = () => {
	const [recipes, setRecipes] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await getData(
					`http://localhost:3000/api/recipes/random`
				);

				if (response.error) {
					setError(response.error);
					console.error('Error fetching recipes:', response.error);
				} else {
					if (Array.isArray(response)) {
						setRecipes(response);
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

	return (
		<StyledFavourite>
			<StyledTitle>Los Favoritos</StyledTitle>
			<StyledCards>
				{error ? (
					<p>Error: {error}</p>
				) : recipes.length > 0 ? (
					recipes.map(recipe =>
						recipe && recipe.name ? (
							<Card key={recipe._id} recipe={recipe} />
						) : (
							<p key={recipe._id}>Recipe data is missing</p>
						)
					)
				) : (
					<p>No recipes found.</p>
				)}
			</StyledCards>
		</StyledFavourite>
	);
};

export default Favourite;
