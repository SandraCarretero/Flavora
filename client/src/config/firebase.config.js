import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDnQ2f4eAgADDdU_kHo05BwlG-BjrL4lsQ',
	authDomain: 'users-firebase-91df5.firebaseapp.com',
	projectId: 'users-firebase-91df5',
	storageBucket: 'users-firebase-91df5.appspot.com',
	messagingSenderId: '149985925827',
	appId: '1:149985925827:web:ede8452794a6371355e076'
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app) 

export {auth, storage}
