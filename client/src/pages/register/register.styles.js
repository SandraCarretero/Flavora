import styled from 'styled-components';

const StyledContainerForm = styled.div`
	padding-top: 4.6875rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	height: calc(100vh - 6.25rem);
`;

const StyledTitle = styled.span`
	font-size: 1.875rem;
`;

const StyledForm = styled.form`
	width: 30%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 20px;
`;

const StyledFormElement = styled.div`
	width: 100%;
	height: 2.5rem;
	position: relative;
`;

const StyledInput = styled.input`
	display: block;
	width: 100%;
	height: 100%;
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
	bottom: 0;
	transform: scaleX(0);
	transition: transform 0.3s ease;
`;

const StyledLabel = styled.label`
	position: absolute;
	left: 0;
	bottom: 0;
	font-size: 16px;
	transform: translateY(0) scale(1);
	transform-origin: left;
	transition: 0.3s ease;
	pointer-events: none;
`;

const StyledButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const StyledButton = styled.input`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #39db4a;
	color: white;
	border: none;
	outline: none;
	height: 2.375rem;
	width: 80%;
	font-size: 1rem;
	border-radius: 2.5rem;
	cursor: pointer;
`;

const StyledButtonGoogle = styled.button`
	width: 2.375rem;
	height: 2.375rem;
	border-radius: 50%;
	border: none;
	cursor: pointer;
`;

const StyledText = styled.span`
	font-size: 12px;
	text-align: center;
	color: #484848;
`;

export {
	StyledContainerForm,
	StyledTitle,
	StyledForm,
	StyledFormElement,
	StyledInput,
	StyledUnderline,
	StyledLabel,
	StyledButtonContainer,
	StyledButton,
	StyledButtonGoogle,
	StyledText
};
