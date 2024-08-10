import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Auth.context';
import { getData } from '../../utils/api';
import Card from '../../components/card/Card';

const Profile = () => {
	const navigate = useNavigate();
	const { userLogged } = useContext(AuthContext);
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		if (userLogged) {
			console.log('Fetching recipes for user:', userLogged.uid); // Verifica el ID del usuario
			getData(`/api/recipes/user?userId=${userLogged.uid}`)
				.then(data => {
					console.log('Recipes data:', data); // Verifica los datos recibidos
					setRecipes(data);
				})
				.catch(error => console.error('Error fetching recipes:', error));
		}
	}, [userLogged]);

	return (
		<>
			<h1>PROFILE</h1>
			{userLogged && <h3>User: {userLogged.email}</h3>}
			<button onClick={() => handleLogout(navigate)}>Logout</button>
			<Link to='/addRecipe'>Crear receta</Link>

			<div>
				<h2>My Recipes</h2>
				{recipes.length > 0 ? (
					recipes.map(recipe => <Card key={recipe._id} recipe={recipe} />)
				) : (
					<p>No recipes found.</p>
				)}
			</div>
		</>
	);
};

const handleLogout = async navigate => {
	await signOut(auth);
	navigate('/');
};

export default Profile;
