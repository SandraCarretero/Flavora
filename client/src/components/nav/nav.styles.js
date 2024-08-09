import styled from 'styled-components';

const StyledHeader = styled.header`
	position: fixed;
	width: 100%;
	height: 4.6875rem;
	background: white;
	display: flex;
	justify-content: space-between;
	padding: 1.25rem;
	z-index: 1;
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

const StyledButtonSmall = styled(StyledButton)`
	width: 3.75rem;
`;

const StyledProfileImage = styled.img`
	height: 1.25rem;
`;

export {
	StyledHeader,
	StyledList,
	StyledContainer,
	StyledButtonBorder,
	StyledButton,
	StyledButtonSmall,
	StyledProfileImage
};
