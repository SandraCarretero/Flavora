import styled from 'styled-components';

const StyledFavourite = styled.div`
	padding-block: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #39db4a12;
`;

const StyledTitle = styled.span`
	font-size: 1.875rem;
`;

const StyledCards = styled.div`
	display: flex;
	padding-top: 3rem;
	gap: 50px;
`;

export { StyledFavourite, StyledTitle, StyledCards };
