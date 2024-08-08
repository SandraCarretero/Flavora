import Favourite from '../../components/favourite/Favourite';
import Intro from '../../components/intro/Intro';
import Popular from '../../components/popular/Popular';

const Home = () => {
	return (
		<>
			<Intro />
			<Popular />
			<Favourite />
		</>
	);
};

export default Home;
