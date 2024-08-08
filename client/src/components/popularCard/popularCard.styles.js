import styled from 'styled-components';

const StyledCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	overflow: hidden;
	width: 12.5rem;
	aspect-ratio: 1;
	box-shadow: 0px 0px 8px 0px #e2e2e2;
	border-radius: 1.25rem;
`;

const StyledImage = styled.img`
	width: 80%;
`;

const StyledText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledCategory = styled.span`
	font-weight: bold;
`;

const StyledAmount = styled.span`
	font-size: 12px;
`;

export { StyledCard, StyledImage, StyledText, StyledCategory, StyledAmount };
