import styled from 'styled-components';

const StyledSection = styled.section`
	border-radius: 0.625rem;
	box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
	padding: 1.25rem;
	padding-top: 4.6875rem;
	max-width: 80%;
	margin: 0 auto;
`;

const StyledFormTop = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1.25rem;
`;

const StyledPhotoUpload = styled.div`
	flex: 1;
	margin-right: 1.25rem;
`;

const StyledPhotoBox = styled.div`
	width: 100%;
	height: 15rem;
	background-color: #f1f1f1;
	border: 2px dashed #ccc;
	border-radius: 0.625rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.875rem;
	color: #666;
	margin-top: 0.9375rem;
`;

const StyledImage = styled.img`
	width: 100%;
`

const StyledRecipeDetails = styled.div`
	flex: 2;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	height: calc(65px * 5.5);
`;

const StyledFormGroup = styled.div`
	margin-bottom: 1.25rem;
	width: 48%;
`;

const StyledLabel = styled.label`
	display: block;
	margin-bottom: 0.3125rem;
	font-weight: bold;
`;

const StyledInput = styled.input`
	width: calc(100% - 1.25rem);
	padding: 0.625rem;
	border: 0.0625rem solid #ccc;
	border-radius: 0.25rem;
`;

const StyledSelect = styled.select`
	width: calc(100% - 1.25rem);
	padding: 0.625rem;
	border: 0.0625rem solid #ccc;
	border-radius: 0.25rem;
`;

const StyledTimeInputs = styled.div`
	width: calc(100% - 1.25rem);
	display: flex;
	gap: 0.625rem;
	justify-content: space-between;
`;

const StyledHr = styled.hr`
	width: 80%;
	border: none;
	border-top: 1px solid #d6d6d683;
`;

const StyledIngredientsContainer = styled.div`
	margin-bottom: 1.25rem;
`;

const StyledStepsContainer = styled.div`
	margin-bottom: 1.25rem;
`;

const StyledButton = styled.button`
	background-color: #39db4a;
	color: white;
	border: none;
	border-radius: 0.25rem;
	padding: 0.625rem 1.25rem;
	cursor: pointer;
`;

export {
	StyledSection,
	StyledFormTop,
	StyledPhotoUpload,
	StyledPhotoBox,
	StyledImage,
	StyledRecipeDetails,
	StyledFormGroup,
	StyledLabel,
	StyledInput,
	StyledSelect,
	StyledTimeInputs,
	StyledHr,
	StyledIngredientsContainer,
	StyledStepsContainer,
	StyledButton
};
