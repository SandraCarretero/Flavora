import { auth, db } from '../config/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
	collection,
	query,
	where,
	getDocs,
	setDoc,
	doc
} from 'firebase/firestore';

export async function registerUser(email, password, username) {
	try {
		const usernameQuery = query(
			collection(db, 'users'),
			where('username', '==', username)
		);
		const querySnapshot = await getDocs(usernameQuery);

		if (!querySnapshot.empty) {
			throw new Error('El nombre de usuario ya está en uso.');
		}

		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const uid = userCredential.user.uid;

		await setDoc(doc(db, 'users', uid), {
			username,
			email
		});

		console.log('Usuario registrado con éxito!');
	} catch (error) {
		console.error('Error al registrar el usuario:', error.message);
	}
}
