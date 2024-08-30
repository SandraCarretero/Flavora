import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../utils/api'; // Utilidad para hacer peticiones POST
import { URLS } from '../../constants/urls'; // Constantes de URL
import { AuthContext } from '../../context/Auth.context'; // Importa el contexto
import {
	StyledButton,
	StyledFormGroup,
	StyledFormTop,
	StyledHr,
	StyledImg,
	StyledContent,
	StyledIngredientsContainer,
	StyledInput,
	StyledLabel,
	StyledPhotoBox,
	StyledPhotoUpload,
	StyledRecipeDetails,
	StyledSection,
	StyledSelect,
	StyledStepsContainer,
	StyledTextarea,
	StyledTimeInputs
} from './addRecipe.styles'; // Asegúrate de tener estos estilos

const AddRecipe = () => {
	const [name, setName] = useState('');
	const [slice, setSlice] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [time, setTime] = useState('');
	const [specialties, setSpecialties] = useState([]);
	const [course, setCourse] = useState('');
	const [mealType, setMealType] = useState('');
	const [steps, setSteps] = useState('');
	const navigate = useNavigate();
	const { userLogged } = useContext(AuthContext);

	return (
		<StyledSection>
			<h2>New recipe</h2>
			<form
				onSubmit={e =>
					handleSubmit(
						e,
						{
							name,
							slice,
							difficulty,
							time,
							specialties,
							course,
							mealType,
							steps
						},
						userLogged,
						navigate
					)
				}
			>
				<StyledFormTop>
					<StyledPhotoUpload>
						<StyledLabel htmlFor='photo'>Seleccionar foto</StyledLabel>
						<input type='file' id='photo' accept='image/*' />
						<StyledPhotoBox></StyledPhotoBox>
					</StyledPhotoUpload>
					<StyledRecipeDetails>
						<StyledFormGroup>
							<StyledLabel htmlFor='name'>Recipe name</StyledLabel>
							<StyledInput
								type='text'
								placeholder='Recipe name'
								value={name}
								onChange={e => setName(e.target.value)}
								required
							/>
						</StyledFormGroup>
						<StyledFormGroup>
							<StyledLabel htmlFor='slice'>Slices</StyledLabel>
							<StyledInput
								type='text'
								placeholder='4'
								value={slice}
								onChange={e => setSlice(e.target.value)}
								required
							/>
						</StyledFormGroup>
						<StyledFormGroup>
							<StyledLabel htmlFor='difficulty'>Difficulty</StyledLabel>
							<StyledSelect
								value={difficulty}
								onChange={e => setDifficulty(e.target.value)}
								required
							>
								<option value=''>Difficulty</option>
								<option value='Fácil'>Easy</option>
								<option value='Media'>Medium</option>
								<option value='Difícil'>Difficult</option>
							</StyledSelect>
						</StyledFormGroup>

						<StyledFormGroup>
							<StyledLabel htmlFor='time'>Time</StyledLabel>
							<StyledTimeInputs>
								<StyledSelect
									value={time}
									onChange={e => setTime(e.target.value)}
									required
								>
									<option value='0'>0h</option>
									<option value='1'>1h</option>
									<option value='2'>2h</option>
									<option value='3'>3h</option>
									<option value='4'>4h</option>
									<option value='5'>5h</option>
									<option value='6'>6h</option>
								</StyledSelect>
								<StyledSelect
									value={time}
									onChange={e => setTime(e.target.value)}
									required
								>
									<option value='0'>0'</option>
									<option value='5'>5'</option>
									<option value='10'>10'</option>
									<option value='15'>15'</option>
									<option value='20'>20'</option>
									<option value='25'>25'</option>
									<option value='30'>30'</option>
									<option value='35'>35'</option>
									<option value='40'>40'</option>
									<option value='45'>45'</option>
									<option value='50'>50'</option>
									<option value='55'>55'</option>
								</StyledSelect>
							</StyledTimeInputs>
						</StyledFormGroup>
						<StyledFormGroup>
							<StyledLabel htmlFor='specials'>Specials</StyledLabel>
							<StyledSelect
								value={specialties}
								onChange={e =>
									setSpecialties(
										[...e.target.selectedOptions].map(option => option.value)
									)
								}
							>
								<option value=''>Especiales</option>
								<option value='Sin gluten'>Sin gluten</option>
								<option value='Vegetariano'>Vegetariano</option>
								<option value='Vegano'>Vegano</option>
							</StyledSelect>
						</StyledFormGroup>
						<StyledFormGroup>
							<StyledLabel htmlFor='type'>Type</StyledLabel>
							<StyledSelect
								value={course}
								onChange={e => setCourse(e.target.value)}
								required
							>
								<option value=''>Tipo de plato</option>
								<option value='Entrante'>Entrante</option>
								<option value='Primer plato'>Primer plato</option>
								<option value='Postre'>Postre</option>
							</StyledSelect>
						</StyledFormGroup>
						<StyledFormGroup>
							<StyledLabel htmlFor='mealType'>Meal Type</StyledLabel>
							<StyledSelect
								value={mealType}
								onChange={e => setMealType(e.target.value)}
								required
							>
								<option value=''>Tipo de comida</option>
								<option value='Carne'>Carne</option>
								<option value='Pescado'>Pescado</option>
								<option value='Verdura'>Verdura</option>
								<option value='Pasta'>Pasta</option>
								<option value='Verdura'>Arroz</option>
								<option value='Postre'>Postre</option>
								<option value='Batido'>Batido</option>
							</StyledSelect>
						</StyledFormGroup>
					</StyledRecipeDetails>
				</StyledFormTop>

				<StyledHr />
				<h3>Ingredients</h3>
				<StyledIngredientsContainer>
					<StyledContent>
						<StyledInput type='number' placeholder='Amount'></StyledInput>
						<StyledSelect>
							<option value=''>Unit of measurement</option>
							<option value='Gusto'>Al gusto</option>
							<option value='Kg'>Kilogramos</option>
							<option value='Cucharada'>Cucharada</option>
							<option value='Cucharadita'>Cucharadita</option>
							<option value='Pizca'>Pizca</option>
						</StyledSelect>
						<StyledInput type='text' placeholder='Ingredient'></StyledInput>
						<StyledImg src='/images/delete.svg' alt='' />
						<StyledImg src='/images/add.svg' alt='' />
					</StyledContent>
				</StyledIngredientsContainer>
				<StyledHr />
				<h3>Steps</h3>
				<StyledStepsContainer>
					<StyledContent>
						<StyledTextarea
							placeholder='Pasos a seguir'
							value={steps}
							onChange={e => setSteps(e.target.value)}
							required
						/>
						<StyledImg src='/images/delete.svg' alt='' />
						<StyledImg src='/images/add.svg' alt='' />
					</StyledContent>
				</StyledStepsContainer>
				<StyledButton type='submit'>Añadir Receta</StyledButton>
			</form>
		</StyledSection>
	);
};

const handleSubmit = async (event, recipeData, userLogged, navigate) => {
	event.preventDefault();

	if (!userLogged) {
		console.error('No user is logged in.');
		return;
	}

	const recipeWithUser = {
		...recipeData,
		userId: userLogged.uid
	};

	try {
		await postData(URLS.API_RECIPES, recipeWithUser);
		navigate('/profile');
	} catch (error) {
		console.error('Error al crear la receta:', error);
	}
};

export default AddRecipe;
