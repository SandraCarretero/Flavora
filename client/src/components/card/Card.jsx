// components/Card/Card.jsx

import {
	StyledFilter,
	StyledCard,
	StyledCategory,
	// StyledImage,
	StyledText,
	StyledComponentDetails,
	StyledDetails,
	StyledDetailsImg,
	StyledContainerSpecials,
	StyledSpecials
} from './card.styles';

const Card = ({ recipe }) => {
	console.log('Rendering recipe:', recipe);
	// Si `recipe` no está definido, muestra un mensaje alternativo
	if (!recipe) {
		return <div>Recipe data not available</div>;
	}

	// Asegúrate de que `recipe.specialties` sea un array antes de llamar a `map`
	const specialties = Array.isArray(recipe.specialties) ? recipe.specialties : [];

	return (
		<StyledCard>
			{/* <StyledImage src={recipe.image || '/images/placeholder.jpg'} alt='' /> */}
			<StyledText>
				<StyledCategory>{recipe.name || 'No name'}</StyledCategory>
				<StyledFilter>
					{recipe.course || 'No course'} | {specialties.join(', ') || 'No specialties'}
				</StyledFilter>
			</StyledText>
			<StyledContainerSpecials>
				{specialties.map((specialty, index) => (
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
