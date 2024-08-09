import {
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import {
	StyledButtonContainer,
	StyledButtonGoogle,
	StyledButton,
	StyledContainerForm,
	StyledForm,
	StyledFormElement,
	StyledInput,
	StyledLabel,
	StyledTitle,
	StyledUnderline,
	StyledText
} from './login.styles';

const Login = () => {
	const navigate = useNavigate();
	return (
		<StyledContainerForm>
			<StyledTitle>Sign In</StyledTitle>
			<StyledForm onSubmit={e => handleSubmit(e, navigate)}>
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
					<StyledButton type='submit' value='Login' />
					<StyledButtonGoogle onClick={() => loginWithGoogle(navigate)}>
						<img src='/images/google.svg' alt='' />
					</StyledButtonGoogle>
				</StyledButtonContainer>
				<StyledText>
					¿Aún no tienes cuenta? <Link to='/register'>Regístrate</Link>
				</StyledText>
			</StyledForm>
		</StyledContainerForm>
	);
};

const handleSubmit = async (event, navigate) => {
	event.preventDefault();
	const { email, password } = event.target;
	try {
		await signInWithEmailAndPassword(auth, email.value, password.value);
		navigate('/');
	} catch (err) {
		console.log(err);
	}

	console.log(email.value, password.value);
};

const loginWithGoogle = async navigate => {
	const provider = new GoogleAuthProvider();

	try {
		await signInWithPopup(auth, provider);
		navigate('/');
	} catch (err) {
		console.log(err);
	}
};

export default Login;
