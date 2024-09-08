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
	StyledContainerCard,
	StyledImageContainer,
	StyledHeartIcon
} from './card.styles';
import { postData } from '../../utils/api';
import { AuthContext } from '../../context/Auth.context';
import { useContext, useEffect, useState } from 'react';

const Card = ({ recipe }) => {
	const { userLogged } = useContext(AuthContext);
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		if (userLogged && Array.isArray(recipe.likedBy)) {
			setIsLiked(recipe.likedBy.includes(userLogged.uid));
		}
	}, [recipe.likedBy, userLogged]);

	const toggleLike = async event => {
		event.stopPropagation();

		if (!userLogged) {
			console.error('User is not logged in');
			return;
		}

		setIsLiked(prevState => !prevState);

		try {
			if (isLiked) {
				await postData('http://localhost:3000/api/recipes/unlike', {
					recipeId: recipe._id,
					userId: userLogged.uid
				});
			} else {
				await postData('http://localhost:3000/api/recipes/like', {
					recipeId: recipe._id,
					userId: userLogged.uid
				});
			}
		} catch (error) {
			setIsLiked(prevState => !prevState);
			console.error('Error al cambiar el like:', error);
		}
	};

	const formatTime = time => {
		if (!time) return 'No time';
		const { hours = 0, minutes = 0 } = time;
		return `${hours}h ${minutes}m`;
	};

	return (
		<StyledContainerCard>
			<StyledHeartIcon
				src={isLiked ? '/images/like.svg' : '/images/noLike.svg'}
				alt={isLiked ? 'liked' : 'not liked'}
				onClick={toggleLike}
			/>
			<Link to={`/recipe/${recipe._id}`}>
				<StyledCard>
					<StyledImageContainer>
						<StyledImage src={recipe.image} alt={recipe.name} />
					</StyledImageContainer>
					<StyledText>
						<StyledCategory>{recipe.name || 'No name'}</StyledCategory>
						<StyledFilter>
							{recipe.course || 'No course'} |{' '}
							{recipe.mealType || 'No meal type'}
						</StyledFilter>
					</StyledText>
					<StyledContainerSpecials>
						{recipe.specialties?.map((specialty, index) => (
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
