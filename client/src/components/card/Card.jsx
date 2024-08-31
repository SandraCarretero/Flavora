import { Link } from 'react-router-dom';
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
	StyledImage,
	StyledContainerCard
} from './card.styles';

const Card = ({ recipe }) => {
	if (!recipe) {
		return <p>No recipe data available</p>;
	}

	const formatTime = time => {
		if (!time) return 'No time';
		const { hours = 0, minutes = 0 } = time;
		return `${hours}h ${minutes}m`;
	};

	return (
		<StyledContainerCard>
			<Link to={`/recipe/${recipe._id}`}>
				<StyledCard>
					<StyledImage src='/images/ensalada.jpg' alt='' />
					<StyledText>
						<StyledCategory>{recipe.name || 'No name'}</StyledCategory>
						<StyledFilter>
							{recipe.course || 'No course'} |{' '}
							{recipe.mealType || 'No specialties'}
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
							<span>{formatTime(recipe.time)}</span>
						</StyledDetails>
						<StyledDetails>
							<StyledDetailsImg src='/images/dificultad.svg' alt='' />
							<span>{recipe.difficulty || 'No difficulty'}</span>
						</StyledDetails>
					</StyledComponentDetails>
				</StyledCard>
			</Link>
		</StyledContainerCard>
	);
};

export default Card;
