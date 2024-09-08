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
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	row-gap: 2.5rem;
	column-gap: 3.75rem;
    width: 80%;
    margin: 0 auto;
	margin-top: 3.25rem;
`;

export {
	StylesMeals,
	StyledFilterContainer,
	StyledFilter,
	StyledMealsContainer
};
