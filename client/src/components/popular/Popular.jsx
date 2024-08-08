import PopularCard from '../popularCard/PopularCard';
import { StyledCards, StyledPopular, StyledTitle } from './popular.styles';

const Popular = () => {
	return (
		<StyledPopular>
			<StyledTitle>Categorías Populares</StyledTitle>
			<StyledCards>
				<PopularCard />
				<PopularCard />
				<PopularCard />
				<PopularCard />
			</StyledCards>
		</StyledPopular>
	);
};

export default Popular;
