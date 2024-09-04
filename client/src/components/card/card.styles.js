import styled from 'styled-components';

const StyledContainerCard = styled.div`
	width: 25%;
`;

const StyledCard = styled.div`
	position: relative;
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	overflow: hidden;
	width: 12.5rem;
	min-height: 15.75rem;
	margin: 0 auto;
	box-shadow: 0px 0px 8px 0px #e2e2e2;
	border-radius: 1.25rem;
	padding-bottom: 0.75rem;

	&::before {
		content: '';
		background-color: #39db4a;
		width: 2.5rem;
		height: 2.5rem;
		position: absolute;
		top: 0;
		right: 0;
		border-radius: 0 0 0 0.625rem;
	}

	&::after {
		content: url(/images/noLike.svg);
		width: 1.25rem;
		position: absolute;
		height: 1.25rem;
		top: 0.625rem;
		right: 0.625rem;
		cursor: pointer;
	}
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
	text-align: center;
	line-height: 1.125rem;
`;

const StyledFilter = styled.span`
	font-size: 0.75rem;
	color: #717171;
	padding-top: 0.5rem;
`;

const StyledContainerSpecials = styled.div`
	display: flex;
	width: 80%;
	gap: 0.3125rem;
	padding-top: 0.3125rem;
`;

const StyledSpecials = styled.div`
	font-size: 0.75rem;
	color: #39db4a;
	border: 0.0625rem solid #39db4a;
	background-color: #39db4a12;
	border-radius: 0.9375rem;
	padding: 0.125rem 0.25rem;
`;

const StyledComponentDetails = styled.div`
	width: 80%;
	display: flex;
	flex-wrap: wrap;
	padding-top: 0.625rem;
	column-gap: 0.375rem;
`;

const StyledDetails = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 48%;
	gap: 0.1875rem;
	font-size: 0.9375rem;
`;

const StyledDetailsImg = styled.img`
	width: 18%;
`;

export {
	StyledContainerCard,
	StyledCard,
	StyledImage,
	StyledText,
	StyledCategory,
	StyledFilter,
	StyledContainerSpecials,
	StyledSpecials,
	StyledComponentDetails,
	StyledDetails,
	StyledDetailsImg
};
