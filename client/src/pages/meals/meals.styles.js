import styled from 'styled-components';

const StylesMeals = styled.div`
	padding-top: 4.6875rem;
`;

const StyledFilterContainer = styled.div`
	margin: 20px;
	display: flex;
	justify-content: center;
`;

const StyledFilter = styled.select`
	padding: 10px;
	font-size: 16px;
`;

const StyledMealsContainer = styled.div`
	margin-top: 3.25rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	row-gap: 2.5rem;
`;

export {
	StylesMeals,
	StyledFilterContainer,
	StyledFilter,
	StyledMealsContainer
};
