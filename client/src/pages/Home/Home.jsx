import Favourite from '../../components/favourite/Favourite';
import Intro from '../../components/intro/Intro';
import Popular from '../../components/popular/Popular';
import { StyledHome } from './home.styles';

const Home = () => {
	return (
		<StyledHome>
			<Intro />
			<Popular />
			<Favourite />
			<Intro />
		</StyledHome>
	);
};

export default Home;
