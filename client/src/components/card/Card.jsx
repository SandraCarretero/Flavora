import {
	StyledFilter,
	StyledCard,
	StyledCategory,
	StyledImage,
	StyledText,
	StyledComponentDetails,
	StyledDetails,
	StyledDetailsImg,
	StyledContainerSpecials,
	StyledSpecials
} from './card.styles';

const Card = () => {
	return (
		<StyledCard>
			<StyledImage src='/images/ensalada.jpg' alt='' />
			<StyledText>
				<StyledCategory>Ensalada de Macarrones</StyledCategory>
				<StyledFilter>Entrantes | Ensaladas</StyledFilter>
			</StyledText>
			<StyledContainerSpecials>
				<StyledSpecials>Vegano</StyledSpecials>
				<StyledSpecials>Vegano</StyledSpecials>
			</StyledContainerSpecials>
			<StyledComponentDetails>
				<StyledDetails>
					<StyledDetailsImg src='/images/reloj.svg' alt='' />
					<span>20 min</span>
				</StyledDetails>
				<StyledDetails>
					<StyledDetailsImg src='/images/dificultad.svg' alt='' />
					<span>Fácil</span>
				</StyledDetails>
			</StyledComponentDetails>
		</StyledCard>
	);
};

export default Card;
