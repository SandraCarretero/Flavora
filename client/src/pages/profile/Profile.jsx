import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Auth.context';
import { getData } from '../../utils/api';
import Card from '../../components/card/Card';
import { StyledMyRecipes, StyledProfile } from './profile.styles';

const Profile = () => {
	const navigate = useNavigate();
	const { userLogged } = useContext(AuthContext);
	const [recipes, setRecipes] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (userLogged) {
			const fetchRecipes = async () => {
				try {
					const response = await getData(
						`http://localhost:3000/api/recipes?userId=${userLogged.uid}`
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
		}
	}, [userLogged]);

	return (
		<StyledProfile>
			<h1>PROFILE</h1>
			{userLogged && <h3>User: {userLogged.email}</h3>}
			<button onClick={() => handleLogout(navigate)}>Logout</button>
			<Link to='/addRecipe'>Crear receta</Link>

			<div>
				<h2>My Recipes</h2>
				<StyledMyRecipes>
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
				</StyledMyRecipes>
			</div>
		</StyledProfile>
	);
};

const handleLogout = async navigate => {
	await signOut(auth);
	navigate('/');
};

export default Profile;
