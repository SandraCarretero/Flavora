import styled from 'styled-components';

const StyledContainerSocialMedia = styled.div`
	display: flex;
	gap: 0.625rem;
`;

const StyledFooter = styled.footer`
	background-color: white;
	border-top: 0.125rem solid #edffef;
	color: white;
	display: flex;
	justify-content: space-between;
	padding: 1.25rem;
	margin-top: 1.25rem;
`;

const StyledCircle = styled.div`
	width: 1.875rem;
	aspect-ratio: 1;
	border-radius: 50%;
	background-color: #edffef;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem;
	cursor: pointer;
	transition: all 0.2s ease-in;

	&:hover {
		background-color: #39db4a;

		img {
			filter: brightness(0) invert(1);
		}
	}
`;

const StyledImageSocialMedia = styled.img`
	width: 100%;
`;

export {
	StyledContainerSocialMedia,
	StyledFooter,
	StyledCircle,
	StyledImageSocialMedia
};
