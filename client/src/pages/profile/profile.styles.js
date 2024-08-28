import styled from 'styled-components';

const StyledProfile = styled.div`
	padding-top: 4.6875rem;
`;

const StyledHeader = styled.div`
	display: flex;
	width: 80%;
	margin: 0 auto;
	gap: 1.25rem;
`;

const StyledColorImg = styled.div`
	width: 130px;
	aspect-ratio: 1;
	background-color: #39db4a;
	font-size: 50px;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	border-radius: 50%;
`;

const StyledColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
`;

const StyledRow = styled.div`
	display: flex;
	align-items: center;
	gap: 1.25rem;
`;

const StyledButton = styled.button`
	font-size: 0.875rem;
	color: #39db4a;
	border: 0.0625rem solid #39db4a;
	background-color: #39db4a12;
	border-radius: 0.9375rem;
	padding: 0.3125rem 0.4375rem;
	cursor: pointer;
`;

const StyledLogout = styled.img`
	width: 1.5625rem;
	cursor: pointer;
`;

const StyledMyRecipes = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	row-gap: 30px;
	justify-items: center;
`;

export {
	StyledProfile,
	StyledHeader,
	StyledButton,
	StyledLogout,
	StyledColorImg,
	StyledColumn,
	StyledRow,
	StyledMyRecipes
};
