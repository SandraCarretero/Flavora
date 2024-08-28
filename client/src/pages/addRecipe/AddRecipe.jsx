import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../utils/api'; // Utilidad para hacer peticiones POST
import { URLS } from '../../constants/urls'; // Constantes de URL
import { AuthContext } from '../../context/Auth.context'; // Importa el contexto
import {
	StyledButton,
	StyledForm,
	StyledInput,
	StyledSelect,
	StyledTextarea
} from './addRecipe.styles'; // Asegúrate de tener estos estilos

const AddRecipe = () => {
	const [name, setName] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [time, setTime] = useState('');
	const [specialties, setSpecialties] = useState([]);
	const [course, setCourse] = useState('');
	const [mealType, setMealType] = useState('');
	const [steps, setSteps] = useState('');
	const navigate = useNavigate();
	const { userLogged } = useContext(AuthContext);

	return (
		<StyledForm
			onSubmit={e =>
				handleSubmit(
					e,
					{
						name,
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
			<StyledInput
				type='text'
				placeholder='Nombre de la receta'
				value={name}
				onChange={e => setName(e.target.value)}
				required
			/>
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
			<StyledInput
				type='text'
				placeholder='Tiempo de preparación'
				value={time}
				onChange={e => setTime(e.target.value)}
				required
			/>
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
			<StyledSelect
				value={mealType}
				onChange={e => setMealType(e.target.value)}
				required
			>
				<option value=''>Tipo de comida</option>
				<option value='Carne'>Carne</option>
				<option value='Pescado'>Pescado</option>
				<option value='Verdura'>Verdura</option>
				<option value='Verdura'>Pasta</option>
				<option value='Dulce'>Dulce</option>
			</StyledSelect>
			<StyledTextarea
				placeholder='Pasos a seguir'
				value={steps}
				onChange={e => setSteps(e.target.value)}
				required
			/>
			<StyledButton type='submit'>Añadir Receta</StyledButton>
		</StyledForm>
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
