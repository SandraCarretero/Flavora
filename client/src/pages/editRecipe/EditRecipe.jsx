import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState, useRef } from 'react';
import { patchData, getData } from '../../utils/api';
import { AuthContext } from '../../context/Auth.context';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase.config';
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
} from '../addRecipe/addRecipe.styles'; // Asegúrate de tener estos estilos
import Ingredients from '../../components/ingredients/Ingredients';
import Steps from '../../components/steps/Steps';

const EditRecipe = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { userLogged } = useContext(AuthContext);

	const [name, setName] = useState('');
	const [slice, setSlice] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [time, setTime] = useState({ hours: 0, minutes: 0 });
	const [specialties, setSpecialties] = useState([]);
	const [course, setCourse] = useState('');
	const [mealType, setMealType] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const [steps, setSteps] = useState([]);
	const [error, setError] = useState(null);

	const fileInputRef = useRef(null);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await getData(
					`http://localhost:3000/api/recipes/${id}`
				);
				if (response.error) {
					setError(response.error);
				} else {
					setName(response.name);
					setSlice(response.slice);
					setDifficulty(response.difficulty);
					setTime(response.time);
					setSpecialties(response.specialties);
					setCourse(response.course);
					setMealType(response.mealType);
					setImageUrl(response.image);
					setIngredients(response.ingredients);
					setSteps(response.steps);
				}
			} catch (error) {
				setError(error.message);
			}
		};
		fetchRecipe();
	}, [id]);

	const handleImageChange = async e => {
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
				setImageUrl(url);
			} catch (error) {
				console.error('Error uploading image:', error);
			}
		}
	};

	const handleSubmit = async event => {
		event.preventDefault();
		if (!userLogged) {
			console.error('No user is logged in.');
			return;
		}
		try {
			await patchData(`http://localhost:3000/api/recipes/${id}`, {
				name,
				slice,
				difficulty,
				time,
				specialties,
				course,
				mealType,
				image: imageUrl,
				ingredients,
				steps,
				userId: userLogged.uid
			});
			navigate(`/profile`);
		} catch (error) {
			console.error('Error al editar receta:', error);
		}
	};

	if (error) return <p>Error: {error}</p>;
	if (!name) return <p>Loading...</p>;

	return (
		<StyledSection>
			<h2>Editar Receta</h2>
			<form onSubmit={handleSubmit}>
				<StyledFormTop>
					<StyledPhotoUpload>
						<StyledLabel htmlFor='photo'>Seleccionar foto</StyledLabel>
						<input
							type='file'
							id='photo'
							ref={fileInputRef}
							onChange={handleImageChange}
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
										setTime(prevTime => ({
											...prevTime,
											hours: parseInt(e.target.value, 10)
										}))
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
										setTime(prevTime => ({
											...prevTime,
											minutes: parseInt(e.target.value, 10)
										}))
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
								<option value='Pollo'>Pollo</option>
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
								handleIngredientChange(id, name, value, setIngredients)
							}
							onAdd={() => addIngredient(setIngredients)}
							onDelete={
								index === 0 && ingredients.length === 1
									? null
									: () => removeIngredient(ingredient.id, setIngredients)
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
							onChange={(id, value) => handleStepChange(id, value, setSteps)}
							onAdd={() => addStep(setSteps)}
							onDelete={
								index === 0 && steps.length === 1
									? null
									: () => removeStep(step.id, setSteps)
							}
							showAddButton={index === steps.length - 1}
						/>
					))}
				</StyledStepsContainer>
				<StyledButton type='submit'>Guardar Cambios</StyledButton>
			</form>
		</StyledSection>
	);
};

const addIngredient = setIngredients => {
	setIngredients(prevIngredients => [
		...prevIngredients,
		{ id: v4(), amount: '', unit: '', ingredient: '' }
	]);
};

const removeIngredient = (id, setIngredients) => {
	setIngredients(prevIngredients =>
		prevIngredients.filter(ingredient => ingredient.id !== id)
	);
};

const addStep = setSteps => {
	setSteps(prevSteps => [...prevSteps, { id: v4(), text: '' }]);
};

const removeStep = (id, setSteps) => {
	setSteps(prevSteps => prevSteps.filter(step => step.id !== id));
};

const handleIngredientChange = (id, name, value, setIngredients) => {
	setIngredients(prevIngredients =>
		prevIngredients.map(ingredient =>
			ingredient.id === id ? { ...ingredient, [name]: value } : ingredient
		)
	);
};

const handleStepChange = (id, value, setSteps) => {
	setSteps(prevSteps =>
		prevSteps.map(step => (step.id === id ? { ...step, text: value } : step))
	);
};

export default EditRecipe;
