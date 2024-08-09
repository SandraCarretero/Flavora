import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth.context';

const Profile = () => {
	const navigate = useNavigate();

	const { userLogged } = useContext(AuthContext);

	return (
		<>
			<h1>PROFILE</h1>
			{userLogged && <h3>User: {userLogged.email}</h3>}
			<button onClick={() => handleLogout(navigate)}>Logout</button>
		</>
	);
};

const handleLogout = async navigate => {
	await signOut(auth);
	navigate('/');
};

export default Profile;
