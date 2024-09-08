import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Auth.context';
import Card from '../../components/card/Card';
import {
	StyledButton,
	StyledColorImg,
	StyledColumn,
	StyledHeader,
	StyledLogout,
	StyledMyRecipes,
	StyledProfile,
	StyledRow,
	StyledProfileImage,
	StyledTabs,
	StyledTab,
	StyledRecipesContainer
} from './profile.styles';
import EditProfile from '../../components/editProfile/EditProfile';
import { getData } from '../../utils/api';

const Profile = () => {
	const navigate = useNavigate();
	const { userLogged, setUserLogged } = useContext(AuthContext);
	const [recipes, setRecipes] = useState([]);
	const [likedRecipes, setLikedRecipes] = useState([]); 
	const [activeTab, setActiveTab] = useState('myRecipes'); 
	const [error, setError] = useState(null);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);

	useEffect(() => {
		if (userLogged) {
			const fetchRecipes = async () => {
				try {
					const response = await getData(
						`http://localhost:3000/api/recipes/user?userId=${userLogged.uid}`
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

	useEffect(() => {
		if (userLogged && activeTab === 'likedRecipes') {
			const fetchAndFilterLikedRecipes = async () => {
				try {
					const response = await getData(`http://localhost:3000/api/recipes`);

					if (response.error) {
						setError(response.error);
						console.error('Error fetching all recipes:', response.error);
					} else {
						if (Array.isArray(response)) {
							const likedRecipes = response.filter(recipe =>
								recipe.likedBy.includes(userLogged.uid)
							);
							setLikedRecipes(likedRecipes);
						} else {
							setError('Unexpected response format');
							console.error('Unexpected response format:', response);
						}
					}
				} catch (error) {
					setError(error.message);
					console.error('Error fetching all recipes:', error);
				}
			};
			fetchAndFilterLikedRecipes();
		}
	}, [userLogged, activeTab]);

	if (!userLogged) {
		return <p>Loading...</p>;
	}

	const renderRecipes = () => {
		if (activeTab === 'myRecipes') {
			return (
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
			);
		} else if (activeTab === 'likedRecipes') {
			return (
				<StyledMyRecipes>
					{error ? (
						<p>Error: {error}</p>
					) : likedRecipes.length > 0 ? (
						likedRecipes.map(recipe =>
							recipe && recipe.name ? (
								<Card key={recipe._id} recipe={recipe} />
							) : (
								<p key={recipe._id}>Recipe data is missing</p>
							)
						)
					) : (
						<p>No liked recipes found.</p>
					)}
				</StyledMyRecipes>
			);
		}
	};

	return (
		<StyledProfile>
			<StyledHeader>
				{userLogged.photoURL ? (
					<StyledProfileImage src={userLogged.photoURL} alt='Profile' />
				) : (
					<StyledColorImg>
						{userLogged.displayName
							? userLogged.displayName.charAt(0).toUpperCase()
							: userLogged.email.charAt(0).toUpperCase()}
					</StyledColorImg>
				)}
				<StyledColumn>
					<StyledRow>
						<span>{userLogged.displayName || userLogged.email}</span>
						<StyledButton onClick={() => setIsLightboxOpen(true)}>
							Edit Profile
						</StyledButton>
						<StyledLogout
							src='/images/logout.svg'
							alt='Logout'
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

			<StyledTabs>
				<StyledTab
					$isActive={activeTab === 'myRecipes'}
					onClick={() => setActiveTab('myRecipes')}
				>
					Recetas
				</StyledTab>
				<StyledTab
					$isActive={activeTab === 'likedRecipes'}
					onClick={() => setActiveTab('likedRecipes')}
				>
					Favs
				</StyledTab>
			</StyledTabs>

			<StyledRecipesContainer>{renderRecipes()}</StyledRecipesContainer>

			{isLightboxOpen && (
				<EditProfile
					user={userLogged}
					onClose={() => setIsLightboxOpen(false)}
					onProfileUpdate={setUserLogged}
				/>
			)}
		</StyledProfile>
	);
};

const handleLogout = async navigate => {
	await signOut(auth);
	navigate('/');
};

export default Profile;
