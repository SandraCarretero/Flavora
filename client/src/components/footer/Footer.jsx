import { Link } from 'react-router-dom';
import { StyledContainerSocialMedia, StyledCircle, StyledFooter, StyledImageSocialMedia } from './footer.styles';

const Footer = () => {
	return (
		<StyledFooter>
			<StyledContainerSocialMedia>
				<StyledCircle>
					<StyledImageSocialMedia src='/images/facebook.svg' alt='' />
				</StyledCircle>
				<StyledCircle>
					<StyledImageSocialMedia src='/images/instagram.svg' alt='' />
				</StyledCircle>
				<StyledCircle>
					<StyledImageSocialMedia src='/images/twitter.svg' alt='' />
				</StyledCircle>
				<StyledCircle>
					<StyledImageSocialMedia src='/images/youtube.svg' alt='' />
				</StyledCircle>
			</StyledContainerSocialMedia>
			<span>
				<Link to='/'>Flavora</Link>
			</span>
		</StyledFooter>
	);
};

export default Footer;
