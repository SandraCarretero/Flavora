import { Link, useLocation } from 'react-router-dom';
import {
	StyledButtonBorder,
	StyledButton,
	StyledContainer,
	StyledHeader,
	StyledList,
	StyledProfileImage,
	StyledButtonSmall
} from './nav.styles';
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth.context';

const Nav = () => {
	const { userLogged } = useContext(AuthContext);
	const location = useLocation();
	const isLoginPage = location.pathname === '/login';
	const isRegisterPage = location.pathname === '/register';
	return (
		<StyledHeader>
			<span>
				<Link to='/'>Flavora</Link>
			</span>
			<nav>
				<StyledList>
					<li>
						<Link to='/'>Comidas</Link>
					</li>
					<li>
						<Link to='/'>Categorías</Link>
					</li>
					<li>
						<Link to='/'>Especiales</Link>
					</li>
				</StyledList>
			</nav>
			<StyledContainer>
				{!userLogged && !isRegisterPage && (
					<Link to='/register'>
						<StyledButtonBorder>Sign Up</StyledButtonBorder>
					</Link>
				)}
				{!userLogged && !isLoginPage && (
					<Link to='/login'>
						<StyledButton>Sign In</StyledButton>
					</Link>
				)}
				{userLogged && (
					<Link to='/profile'>
						<StyledButtonSmall>
							<StyledProfileImage src='/images/perfil.svg' alt='' />
						</StyledButtonSmall>
					</Link>
				)}
			</StyledContainer>
		</StyledHeader>
	);
};

export default Nav;
