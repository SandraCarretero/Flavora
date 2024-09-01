import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Auth.context';
import { getData } from '../../utils/api';
import Card from '../../components/card/Card';
import {
	StyledButton,
	StyledColorImg,
	StyledColumn,
	StyledHeader,
	StyledLogout,
	StyledMyRecipes,
	StyledProfile,
	StyledRow
} from './profile.styles';

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
			<StyledHeader>
				{userLogged && (
					<StyledColorImg>
						{userLogged.displayName
							? userLogged.displayName.charAt(0).toUpperCase()
							: userLogged.email.charAt(0).toUpperCase()}
					</StyledColorImg>
				)}
				<StyledColumn>
					<StyledRow>
						{userLogged && (
							<span>{userLogged.displayName || userLogged.email}</span>
						)}
						<StyledButton>Edit Profile</StyledButton>
						<StyledLogout
							src='/images/logout.svg'
							alt=''
							onClick={() => handleLogout(navigate)}
						/>
					</StyledRow>
					<StyledRow>
						<span>{recipes.length} recetas</span>
						<StyledButton>
							<Link to='/addRecipe'>Crear receta</Link>
						</StyledButton>
					</StyledRow>
				</StyledColumn>
			</StyledHeader>

			<div>
				<h2>Mis recetas</h2>
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
