import styled from 'styled-components';

const StyledPopular = styled.div`
	padding-block: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledTitle = styled.span`
	font-size: 1.875rem;
`;

const StyledCards = styled.div`
	display: flex;
	padding-top: 3rem;
	gap: 50px;
`;

export { StyledPopular, StyledTitle, StyledCards };
