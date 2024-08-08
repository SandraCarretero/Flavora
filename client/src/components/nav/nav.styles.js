import styled from 'styled-components';

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
`;

const StyledList = styled.ul`
	display: flex;
	gap: 1.875rem;
`;

const StyledContainer = styled.div`
	display: flex;
	gap: 0.9375rem;
`;

const StyledButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #39db4a;
	color: white;
	width: 5.625rem;
	height: 1.875rem;
	border-radius: 2.5rem;
	cursor: pointer;
`;

const StyledButtonBorder = styled(StyledButton)`
	border: 0.0625rem solid #39db4a;
	background-color: white;
	color: #39db4a;
`;

export {
	StyledHeader,
	StyledList,
	StyledContainer,
	StyledButtonBorder,
	StyledButton
};
