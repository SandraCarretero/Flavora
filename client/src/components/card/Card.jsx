import {
	StyledCard,
	StyledCategory,
	StyledFilter,
	StyledText,
	StyledComponentDetails,
	StyledDetails,
	StyledDetailsImg,
	StyledContainerSpecials,
	StyledSpecials,
	StyledImage
} from './card.styles';

const Card = ({ recipe }) => {
	if (!recipe) {
		return <p>No recipe data available</p>;
	}

	return (
		<StyledCard>
			<StyledImage src='/images/ensalada.jpg' alt='' />
			<StyledText>
				<StyledCategory>{recipe.name || 'No name'}</StyledCategory>
				<StyledFilter>
					{recipe.course || 'No course'} |{' '}
					{recipe.specialties.join(' | ') || 'No specialties'}
				</StyledFilter>
			</StyledText>
			<StyledContainerSpecials>
				{recipe.specialties.map((specialty, index) => (
					<StyledSpecials key={index}>{specialty}</StyledSpecials>
				))}
			</StyledContainerSpecials>
			<StyledComponentDetails>
				<StyledDetails>
					<StyledDetailsImg src='/images/reloj.svg' alt='' />
					<span>{recipe.time || 'No time'}</span>
				</StyledDetails>
				<StyledDetails>
					<StyledDetailsImg src='/images/dificultad.svg' alt='' />
					<span>{recipe.difficulty || 'No difficulty'}</span>
				</StyledDetails>
			</StyledComponentDetails>
		</StyledCard>
	);
};

export default Card;
