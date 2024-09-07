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
	StyledRow,
	StyledProfileImage // Asegúrate de tener un estilo para la imagen del perfil
} from './profile.styles';
import EditProfile from '../../components/editProfile/EditProfile';

const Profile = () => {
	const navigate = useNavigate();
	const { userLogged, setUserLogged } = useContext(AuthContext); 
	const [recipes, setRecipes] = useState([]);
	const [error, setError] = useState(null);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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

	// Verifica que userLogged esté definido
	if (!userLogged) {
		return <p>Loading...</p>; // O puedes usar un spinner o cualquier indicador de carga
	}

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
						{/* Asegúrate de que userLogged esté definido antes de renderizar */}
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

			{isLightboxOpen && (
				<EditProfile
					user={userLogged}
					onClose={() => setIsLightboxOpen(false)}
					onProfileUpdate={setUserLogged} // Pasamos la función para actualizar el usuario
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
