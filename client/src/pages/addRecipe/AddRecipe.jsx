import { v4 } from 'uuid';
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
	StyledIngredientsContainer,
	StyledInput,
	StyledLabel,
	StyledPhotoBox,
	StyledPhotoUpload,
	StyledRecipeDetails,
	StyledSection,
	StyledSelect,
	StyledStepsContainer,
	StyledTimeInputs
} from './addRecipe.styles'; // Asegúrate de tener estos estilos
import Ingredients from '../../components/ingredients/Ingredients';
import Steps from '../../components/steps/Steps';

const AddRecipe = () => {
	const [name, setName] = useState('');
	const [slice, setSlice] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [time, setTime] = useState({ hours: 0, minutes: 0 });
	const [specialties, setSpecialties] = useState([]);
	const [course, setCourse] = useState('');
	const [mealType, setMealType] = useState('');
	const navigate = useNavigate();
	const { userLogged } = useContext(AuthContext);

	const [ingredients, setIngredients] = useState([
		{ id: v4(), amount: '', unit: '', ingredient: '' }
	]);
	const [steps, setSteps] = useState([{ id: v4(), text: '' }]);

	const handleIngredientChange = (id, name, value) => {
		setIngredients(
			ingredients.map(ingredient =>
				ingredient.id === id ? { ...ingredient, [name]: value } : ingredient
			)
		);
	};

	const handleStepChange = (id, value) => {
		setSteps(
			steps.map(step => (step.id === id ? { ...step, text: value } : step))
		);
	};

	const handleTimeChange = (type, value) => {
		const numericValue = parseInt(value, 10);
		setTime(prevTime => ({
			...prevTime,
			[type]: isNaN(numericValue) ? 0 : numericValue
		}));
	};

	return (
		<StyledSection>
			<h2>Nueva Receta</h2>
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
							ingredients,
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
							<StyledLabel htmlFor='name'>Nombre</StyledLabel>
							<StyledInput
								type='text'
								placeholder='Nombre'
								value={name}
								onChange={e => setName(e.target.value)}
								required
							/>
						</StyledFormGroup>
						<StyledFormGroup>
							<StyledLabel htmlFor='slice'>Porciones</StyledLabel>
							<StyledInput
								type='text'
								placeholder='4'
								value={slice}
								onChange={e => setSlice(e.target.value)}
								required
							/>
						</StyledFormGroup>
						<StyledFormGroup>
							<StyledLabel htmlFor='difficulty'>Dificultad</StyledLabel>
							<StyledSelect
								value={difficulty}
								onChange={e => setDifficulty(e.target.value)}
								required
							>
								<option value=''>Dificultad</option>
								<option value='Fácil'>Fácil</option>
								<option value='Media'>Media</option>
								<option value='Difícil'>Difícil</option>
							</StyledSelect>
						</StyledFormGroup>

						<StyledFormGroup>
							<StyledLabel htmlFor='time'>Tiempo</StyledLabel>
							<StyledTimeInputs>
								<StyledSelect
									value={time.hours}
									onChange={e => handleTimeChange('hours', e.target.value)}
									required
								>
									<option value='0'>0</option>
									<option value='1'>1</option>
									<option value='2'>2</option>
									<option value='3'>3</option>
									<option value='4'>4</option>
									<option value='5'>5</option>
									<option value='6'>6</option>
								</StyledSelect>
								<StyledSelect
									value={time.minutes}
									onChange={e => handleTimeChange('minutes', e.target.value)}
									required
								>
									<option value='0'>0</option>
									<option value='5'>5</option>
									<option value='10'>10</option>
									<option value='15'>15</option>
									<option value='20'>20</option>
									<option value='25'>25</option>
									<option value='30'>30</option>
									<option value='35'>35</option>
									<option value='40'>40</option>
									<option value='45'>45</option>
									<option value='50'>50</option>
									<option value='55'>55</option>
								</StyledSelect>
							</StyledTimeInputs>
						</StyledFormGroup>

						<StyledFormGroup>
							<StyledLabel htmlFor='type'>Tipo de plato</StyledLabel>
							<StyledSelect
								value={course}
								onChange={e => setCourse(e.target.value)}
								required
							>
								<option value=''>Tipo de plato</option>
								<option value='Desayuno'>Desayuno</option>
								<option value='Entrante'>Entrante</option>
								<option value='Acompañamiento'>Acompañamiento</option>
								<option value='Primer plato'>Primer plato</option>
								<option value='Postre'>Postre</option>
								<option value='Tentempié'>Tentempié</option>
							</StyledSelect>
						</StyledFormGroup>
						<StyledFormGroup>
							<StyledLabel htmlFor='mealType'>Tipo de comida</StyledLabel>
							<StyledSelect
								value={mealType}
								onChange={e => setMealType(e.target.value)}
								required
							>
								<option value=''>Tipo de comida</option>
								<option value='Carne'>Carne</option>
								<option value='Pescado'>Pescado</option>
								<option value='Puré'>Pescado</option>
								<option value='Patatas'>Patatas</option>
								<option value='Verdura'>Verdura</option>
								<option value='Pasta'>Pasta</option>
								<option value='Arroz'>Arroz</option>
								<option value='Postre'>Postre</option>
								<option value='Batido'>Batido</option>
							</StyledSelect>
						</StyledFormGroup>
						<StyledFormGroup>
							<StyledLabel htmlFor='specials'>Especiales</StyledLabel>
							<StyledSelect
								value={specialties}
								onChange={e =>
									setSpecialties(
										[...e.target.selectedOptions].map(option => option.value)
									)
								}
								multiple
							>
								<option value=''>Especiales</option>
								<option value='Sin gluten'>Sin gluten</option>
								<option value='Vegetariano'>Vegetariano</option>
								<option value='Vegano'>Vegano</option>
							</StyledSelect>
						</StyledFormGroup>
					</StyledRecipeDetails>
				</StyledFormTop>

				<StyledHr />
				<h3>Ingredientes</h3>
				<StyledIngredientsContainer>
					{ingredients.map((ingredient, index) => (
						<Ingredients
							key={ingredient.id}
							ingredient={ingredient}
							onChange={handleIngredientChange}
							onAdd={() => addIngredient(setIngredients, ingredients)}
							onDelete={
								index === 0 && ingredients.length === 1
									? null
									: () =>
											removeIngredient(
												setIngredients,
												ingredients,
												ingredient.id
											)
							}
							showAddButton={index === ingredients.length - 1}
						/>
					))}
				</StyledIngredientsContainer>
				<StyledHr />
				<h3>Pasos</h3>
				<StyledStepsContainer>
					{steps.map((step, index) => (
						<Steps
							key={step.id}
							step={step}
							onChange={handleStepChange}
							onAdd={() => addStep(setSteps, steps)}
							onDelete={
								index === 0 && steps.length === 1
									? null
									: () => removeStep(setSteps, steps, step.id)
							}
							showAddButton={index === steps.length - 1}
						/>
					))}
				</StyledStepsContainer>
				<StyledButton type='submit'>Añadir Receta</StyledButton>
			</form>
		</StyledSection>
	);
};

const addIngredient = (setIngredients, ingredients) => {
	setIngredients([
		...ingredients,
		{ id: v4(), amount: '', unit: '', ingredient: '' }
	]);
};

const removeIngredient = (setIngredients, ingredients, id) => {
	setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
};

const addStep = (setSteps, steps) => {
	setSteps([...steps, { id: v4(), text: '' }]);
};

const removeStep = (setSteps, steps, id) => {
	setSteps(steps.filter(step => step.id !== id));
};

const handleSubmit = async (event, recipeData, userLogged, navigate) => {
	event.preventDefault();

	if (!userLogged) {
		console.error('No user is logged in.');
		return;
	}

	const recipeWithUser = {
		...recipeData,
		time: {
			hours: parseInt(recipeData.time.hours, 10),
			minutes: parseInt(recipeData.time.minutes, 10)
		},
		userId: userLogged.uid
	};

	console.log('Datos de la receta a enviar:', recipeWithUser);

	try {
		await postData(URLS.API_RECIPES, recipeWithUser);
		navigate('/profile');
	} catch (error) {
		console.error(
			'Error al crear la receta:',
			error.response || error.message || error
		);
	}
};

export default AddRecipe;
