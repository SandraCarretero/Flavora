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

const StyledProfileImage = styled.img`
	width: 8.125rem;
	aspect-ratio: 1;
	border-radius: 50%;
`;

const StyledColorImg = styled.div`
	width: 8.125rem;
	aspect-ratio: 1;
	background-color: #39db4a;
	font-size: 3.125rem;
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
	display: flex;
	gap: 70px;
	flex-wrap: wrap-reverse;
	flex-direction: row-reverse;
	width: 80%;
	margin: 0 auto;
	justify-content: center;
`;

const StyledTabs = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 20px;
`;

const StyledTab = styled.button`
	background: none;
	border: none;
	border-bottom: 2px solid
		${({ $isActive }) => ($isActive ? '#39db4a' : 'transparent')};
	color: ${({ $isActive }) => ($isActive ? '#39db4a' : '#717171')};
	font-size: 1rem;
	padding: 10px;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		color: #39db4a;
	}

	&:focus {
		outline: none;
	}
`;

const StyledRecipesContainer = styled.div`
	padding-top: 3.75rem;
`;

export {
	StyledProfile,
	StyledHeader,
	StyledButton,
	StyledLogout,
	StyledProfileImage,
	StyledColorImg,
	StyledColumn,
	StyledRow,
	StyledMyRecipes,
	StyledTabs,
	StyledTab,
	StyledRecipesContainer
};
