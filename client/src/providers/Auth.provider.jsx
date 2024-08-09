import { useEffect, useState } from 'react';
import { AuthContext } from '../context/Auth.context';
import { auth } from '../config/firebase.config';

const AuthProvider = ({ children }) => {
	const [userLogged, setUserLogged] = useState();

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged(user => {
			if (user) {
				console.log('User loged', user);
				setUserLogged(user);
			} else {
				console.log('Not user');
				setUserLogged(null);
			}

			return () => unsuscribe();
		});
	}, []);

	return (
		<AuthContext.Provider value={{ userLogged, setUserLogged }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
