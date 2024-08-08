import { StyledElement, StyledIntro } from './intro.styles';

const Intro = () => {
	return (
		<StyledIntro>
			<StyledElement>
				<p>Aquí va el texto bla bla bla</p>
			</StyledElement>
			<StyledElement>
				<img src='/images/intro.jpg' alt='' />
			</StyledElement>
		</StyledIntro>
	);
};

export default Intro;
