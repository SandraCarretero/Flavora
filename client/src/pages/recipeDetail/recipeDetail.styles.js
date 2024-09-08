import styled from 'styled-components';

const StyledSection = styled.section`
	border-radius: 0.625rem;
	box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
	padding: 1.25rem;
	padding-top: 4.6875rem;
	max-width: 80%;
	margin: 0 auto;
`;

const StyledTop = styled.div`
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
	background-color: ${({ $hasImage }) =>
		$hasImage ? 'transparent' : '#f1f1f1'};
	border: ${({ $hasImage }) =>
		$hasImage ? '1px solid #39db4a' : '2px dashed #ccc'};
	border-radius: 0.625rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.875rem;
	color: #666;
	margin-top: 0.9375rem;
	position: relative;
	overflow: hidden;
`;

const StyledImage = styled.img`
	width: 100%;
`;

const StyledRecipeDetails = styled.div`
	flex: 2;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 0.8125rem;
`;

const StyledDetails = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 48%;
	gap: 0.1875rem;
`;

const StyledDetailsImg = styled.img`
	width: 6%;
`;

const StyledSpecials = styled.div`
	font-size: 0.75rem;
	color: #39db4a;
	border: 0.0625rem solid #39db4a;
	background-color: #39db4a12;
	border-radius: 0.9375rem;
	padding: 0.125rem 0.25rem;
`;

const StyledHr = styled.hr`
	width: 80%;
	border: none;
	border-top: 1px solid #d6d6d683;
`;

const StyledList = styled.ol`
	padding-left: 1.25rem;
`;

const StyledMenuIcon = styled.div`
	top: 0.625rem;
	right: 0.625rem;
	cursor: pointer;

	img {
		width: 2.5rem;
		aspect-ratio: 1;
	}
`;

const StyledMenuOptions = styled.div`
	position: absolute;
	top: 5.3125rem;
	right: 10.625rem;
	background-color: white;
	border: 0.0625rem solid #ccc;
	border-radius: 5px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	z-index: 10;
`;

const StyledMenuOptionBtn = styled.button`
	display: flex;
	align-items: center;
	padding: 10px;
	background: none;
	border: none;
	cursor: pointer;
	width: 100%;
	text-align: left;

	img {
		width: 1.25rem;
		height: 1.25rem;
		margin-right: 0.625rem;
	}

	&:hover {
		background-color: #f0f0f0;
	}
`;

export {
	StyledSection,
	StyledTop,
	StyledPhotoUpload,
	StyledPhotoBox,
	StyledImage,
	StyledRecipeDetails,
	StyledDetails,
	StyledDetailsImg,
	StyledSpecials,
	StyledHr,
	StyledList,
	StyledMenuIcon,
	StyledMenuOptions,
	StyledMenuOptionBtn
};
