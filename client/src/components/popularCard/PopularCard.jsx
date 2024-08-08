import {
	StyledAmount,
	StyledCard,
	StyledCategory,
	StyledImage,
	StyledText
} from './popularCard.styles';

const PopularCard = () => {
	return (
		<StyledCard>
			<StyledImage src='/images/ensalada.jpg' alt='' />
			<StyledText>
				<StyledCategory>Ensaladas</StyledCategory>
				<StyledAmount>(86 ensaladas)</StyledAmount>
			</StyledText>
		</StyledCard>
	);
};

export default PopularCard;
