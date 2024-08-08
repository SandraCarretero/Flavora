import { Link } from 'react-router-dom';
import {
	StyledButtonBorder,
	StyledButton,
	StyledContainer,
	StyledHeader,
	StyledList
} from './nav.styles';

const Nav = () => {
	return (
		<StyledHeader>
			<span>Flavora</span>
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
				<StyledButtonBorder>Sign Up</StyledButtonBorder>
				<StyledButton>Sign In</StyledButton>
			</StyledContainer>
		</StyledHeader>
	);
};

export default Nav;
