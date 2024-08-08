import Card from '../card/Card';
import { StyledCards, StyledFavourite, StyledTitle } from './favourite.styles';

const Favourite = () => {
	return (
		<StyledFavourite>
			<StyledTitle>Los Favoritos</StyledTitle>
			<StyledCards>
				<Card />
				<Card />
				<Card />
				<Card />
			</StyledCards>
		</StyledFavourite>
	);
};

export default Favourite;
