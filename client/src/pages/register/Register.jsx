import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	updateProfile
} from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import {
	StyledButton,
	StyledButtonContainer,
	StyledButtonGoogle,
	StyledContainerForm,
	StyledForm,
	StyledFormElement,
	StyledInput,
	StyledLabel,
	StyledText,
	StyledTitle,
	StyledUnderline
} from './register.styles';

const Register = () => {
	const navigate = useNavigate();
	return (
		<StyledContainerForm>
			<StyledTitle>Sign Up</StyledTitle>
			<StyledForm onSubmit={e => handleSubmit(e, navigate)}>
				<StyledFormElement>
					<StyledInput type='text' name='username' placeholder='' />
					<StyledLabel htmlFor='username'>Username</StyledLabel>
					<StyledUnderline />
				</StyledFormElement>
				<StyledFormElement>
					<StyledInput type='text' name='email' placeholder='' />
					<StyledLabel htmlFor='email'>Email</StyledLabel>
					<StyledUnderline />
				</StyledFormElement>
				<StyledFormElement>
					<StyledInput type='password' name='password' placeholder='' />
					<StyledLabel htmlFor='password'>Password</StyledLabel>
					<StyledUnderline></StyledUnderline>
				</StyledFormElement>
				<StyledButtonContainer>
					<StyledButton type='submit' value='Register' />
					<StyledButtonGoogle onClick={() => registerWithGoogle(navigate)}>
						<img src='/images/google.svg' alt='' />
					</StyledButtonGoogle>
				</StyledButtonContainer>
				<StyledText>
					¿Ya tienes cuenta? <Link to='/login'>Inicia Sesión</Link>
				</StyledText>
			</StyledForm>
		</StyledContainerForm>
	);
};

const handleSubmit = async (event, navigate) => {
	event.preventDefault();
	const { email, password, username } = event.target;
	try {
		await registerUser(email.value, password.value, username.value);
	} catch (err) {
		console.log(err);
	}

	navigate('/');

	console.log(email.value, password.value);
};

const registerWithGoogle = async navigate => {
	const provider = new GoogleAuthProvider();

	try {
		await signInWithPopup(auth, provider);
		navigate('/');
	} catch (err) {
		console.log(err);
	}
};

const registerUser = async (email, password, username) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;

		await updateProfile(user, {
			displayName: username
		});

	} catch (error) {
		console.error('Error during registration:', error);
		throw new Error(error.message);
	}
};

export default Register;
