import styled from 'styled-components';

const StyledContent = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.625rem;
	gap: 0.625rem;
`;

const StyledImg = styled.img`
	width: 1.875rem;
	cursor: pointer;
`;

const StyledInput = styled.input`
	width: calc(100% - 1.25rem);
	padding: 0.625rem;
	border: 0.0625rem solid #ccc;
	border-radius: 0.25rem;
`;


const StyledTextarea = styled.textarea`
	width: calc(100% - 1.25rem);
	padding: 0.625rem;
	border: 0.0625rem solid #ccc;
	border-radius: 0.25rem;
	resize: none;
	field-sizing: content;
`;

export { StyledContent, StyledImg, StyledInput, StyledTextarea };
