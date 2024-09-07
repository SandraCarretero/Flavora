import styled from 'styled-components';

const StyledPhotoBox = styled.div`
	max-width: 100%;
	max-height: 200px;
	border-radius: 50%;
	margin-bottom: 10px;
	object-fit: cover;
`;

const StyledLightboxBackground = styled.div`
	position: fixed;
	top: 1.875rem;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledLightboxContainer = styled.div`
	background: white;
	padding: 1.25rem;
	border-radius: 0.625rem;
	width: 25rem;
	max-width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledLightboxHeader = styled.h2`
	margin: 0;
	margin-bottom: 0.625rem;
`;

const StyledLightboxButton = styled.button`
	font-size: 1.125rem;
	color: #39db4a;
	border: 0.0625rem solid #39db4a;
	background-color: #39db4a12;
	border-radius: 0.9375rem;
	padding: 0.1875rem 0.625rem;
	cursor: pointer;
`;

const StyledColorImg = styled.div`
	width: 12.5rem;
	aspect-ratio: 1;
	background-color: #f1fcf2;
	font-size: 3.125rem;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #39db4a;
	border-radius: 50%;
`;

const StyledPreviewImage = styled.img`
	max-width: 100%;
	max-height: 200px;
	border-radius: 50%;
	margin-bottom: 10px;
	object-fit: cover;
`;

const StyledFormElement = styled.div`
	width: 85%;
	margin-top: 0.625rem;
	height: 2.5rem;
	position: relative;
`;

const StyledInput = styled.input`
	display: block;
	width: 100%;
	height: 1.5625rem;
	border: none;
	outline: none;
	font-size: 1.0625rem;
	border-bottom: 2px solid #0000001f;
	background-color: transparent;
	appearance: none;
	padding: 0;
	border-radius: 0;

	&:focus ~ label,
	&:not(:placeholder-shown) ~ label {
		transform: translateY(-35px) scale(0.85);
		color: #39db4a;
	}

	&:focus ~ div {
		transform: scaleX(1);
	}
`;

const StyledUnderline = styled.div`
	width: 100%;
	height: 2px;
	background: #39db4a;
	position: absolute;
	bottom: 15px;
	transform: scaleX(0);
	transition: transform 0.3s ease;
`;

const StyledButtonContent = styled.div`
	display: flex;
	gap: 0.9375rem;
`;

const StyledContainerImg = styled.div`
	position: relative;
`;

const StyledInputImg = styled.input`
	opacity: 0;
	overflow: hidden;
	position: absolute;
	top: 73%;
	left: 73%;
	width: 50px;
	height: 51px;
	cursor: pointer;
`;

const StyledLabelImg = styled.label`
	position: absolute;
	left: 73%;
	top: 73%;
	font-weight: 600;
	color: #fff;
	background-color: #39db4a;
	transition: all 0.5s;
	cursor: pointer;
	text-transform: uppercase;
	width: 46px;
	display: flex;
	border-radius: 50%;
	aspect-ratio: 1;
	text-align: center;
	justify-content: center;
	align-items: center;
`;

const StyledDelete = styled.img`
	width: 1.75rem;
	cursor: pointer;
`;

export {
	StyledPhotoBox,
	StyledLightboxBackground,
	StyledLightboxContainer,
	StyledLightboxHeader,
	StyledLightboxButton,
	StyledColorImg,
	StyledPreviewImage,
	StyledFormElement,
	StyledInput,
	StyledUnderline,
	StyledButtonContent,
	StyledContainerImg,
	StyledInputImg,
	StyledLabelImg,
	StyledDelete
};
