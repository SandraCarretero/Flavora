import { v4 } from 'uuid';
import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../utils/api'; // Utilidad para hacer peticiones POST
import { URLS } from '../../constants/urls'; // Constantes de URL
import { AuthContext } from '../../context/Auth.context'; // Importa el contexto
import {
	StyledButton,
	StyledFormGroup,
	StyledFormTop,
	StyledHr,
	StyledImage,
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
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase.config';

const AddRecipe = () => {
	const [name, setName] = useState('');
	const [slice, setSlice] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [time, setTime] = useState({ hours: 0, minutes: 0 });
	const [specialties, setSpecialties] = useState([]);
	const [course, setCourse] = useState('');
	const [mealType, setMealType] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [ingredients, setIngredients] = useState([
		{ id: v4(), amount: '', unit: '', ingredient: '' }
	]);
	const [steps, setSteps] = useState([{ id: v4(), text: '' }]);

	const fileInputRef = useRef(null);
	const navigate = useNavigate();
	const { userLogged } = useContext(AuthContext);

	return (
		<StyledSection>
			<h2>Nueva Receta</h2>
			<form
				onSubmit={e =>
					handleSubmit(
						e,
						userLogged,
						{
							name,
							slice,
							difficulty,
							time,
							specialties,
							course,
							mealType,
							image: imageUrl,
							ingredients,
							steps
						},
						navigate
					)
				}
			>
				<StyledFormTop>
					<StyledPhotoUpload>
						<StyledLabel htmlFor='photo'>Seleccionar foto</StyledLabel>
						<input
							type='file'
							id='photo'
							ref={fileInputRef}
							onChange={e => handleImageChange(e, setImageUrl)}
							accept='image/*'
						/>
						<StyledPhotoBox>
							{imageUrl && <StyledImage src={imageUrl} alt='Preview' />}
						</StyledPhotoBox>
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
									onChange={e =>
										handleTimeChange('hours', e.target.value, setTime)
									}
									required
								>
									{Array.from({ length: 7 }, (_, i) => i).map(hour => (
										<option key={hour} value={hour}>
											{hour}
										</option>
									))}
								</StyledSelect>
								<StyledSelect
									value={time.minutes}
									onChange={e =>
										handleTimeChange('minutes', e.target.value, setTime)
									}
									required
								>
									{Array.from({ length: 12 }, (_, i) => i * 5).map(minute => (
										<option key={minute} value={minute}>
											{minute}
										</option>
									))}
								</StyledSelect>
							</StyledTimeInputs>
						</StyledFormGroup>
						<StyledFormGroup>
							<StyledLabel htmlFor='course'>Tipo de plato</StyledLabel>
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
								<option value='Puré'>Puré</option>
								<option value='Patatas'>Patatas</option>
								<option value='Verdura'>Verdura</option>
								<option value='Pasta'>Pasta</option>
								<option value='Arroz'>Arroz</option>
								<option value='Postre'>Postre</option>
								<option value='Batido'>Batido</option>
							</StyledSelect>
						</StyledFormGroup>
						<StyledFormGroup>
							<StyledLabel htmlFor='specialties'>Especiales</StyledLabel>
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
							onChange={(id, name, value) =>
								handleIngredientChange(
									id,
									name,
									value,
									ingredients,
									setIngredients
								)
							}
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
							onChange={(id, value) =>
								handleStepChange(id, value, steps, setSteps)
							}
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

// Funciones fuera del componente

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

const handleImageChange = async (e, setImageUrl) => {
	const file = e.target.files[0];
	if (file) {
		const nameWithoutExtension = file.name.substring(
			0,
			file.name.lastIndexOf('.')
		);
		const finalName = `${nameWithoutExtension}-${v4()}`;
		const storageRef = ref(storage, `recipes/${finalName}`);
		try {
			await uploadBytes(storageRef, file);
			const url = await getDownloadURL(storageRef);
			console.log('Image URL:', url);
			setImageUrl(url);
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	}
};

const handleIngredientChange = (
	id,
	name,
	value,
	ingredients,
	setIngredients
) => {
	setIngredients(
		ingredients.map(ingredient =>
			ingredient.id === id ? { ...ingredient, [name]: value } : ingredient
		)
	);
};

const handleStepChange = (id, value, steps, setSteps) => {
	setSteps(
		steps.map(step => (step.id === id ? { ...step, text: value } : step))
	);
};

const handleTimeChange = (type, value, setTime) => {
	const numericValue = parseInt(value, 10);
	setTime(prevTime => ({
		...prevTime,
		[type]: isNaN(numericValue) ? 0 : numericValue
	}));
};

const handleSubmit = async (event, userLogged, recipeData, navigate) => {
	event.preventDefault();

	if (!userLogged) {
		console.error('No user is logged in.');
		return;
	}

	try {
		await postData(URLS.API_RECIPES, { ...recipeData, userId: userLogged.uid });
		navigate('/profile');
	} catch (error) {
		console.error(
			'Error al crear la receta:',
			error.response || error.message || error
		);
	}
};

export default AddRecipe;
