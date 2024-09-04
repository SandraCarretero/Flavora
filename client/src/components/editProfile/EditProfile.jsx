import { useState } from 'react';
import {
	LightboxBackground,
	LightboxButton,
	LightboxContainer,
	LightboxHeader,
	PreviewImage,
	StyledButtonContent,
	StyledFormElement, // Asegúrate de tener un estilo para la vista previa
	StyledInput,
	StyledUnderline
} from './editProfile.styles';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '../../config/firebase.config';
import { updateProfile } from 'firebase/auth';
import { v4 } from 'uuid';

// Componente para la edición del perfil
const EditProfile = ({ onClose, user, onProfileUpdate }) => {
	const [displayName, setDisplayName] = useState(user.displayName || '');
	const [previewURL, setPreviewURL] = useState(user.photoURL || ''); // Estado para la vista previa
	const [profileImage, setProfileImage] = useState(null);
	const [loading, setLoading] = useState(false);

	return (
		<LightboxBackground onClick={onClose}>
			<LightboxContainer onClick={e => e.stopPropagation()}>
				<LightboxHeader>Editar Perfil</LightboxHeader>

				{previewURL && <PreviewImage src={previewURL} alt='Preview' />}
				<input
					type='file'
					accept='image/*'
					onChange={e => handleImageChange(e, setProfileImage, setPreviewURL)}
				/>

				<StyledFormElement>
					<StyledInput
						type='text'
						value={displayName}
						onChange={e => setDisplayName(e.target.value)}
						placeholder='Display Name'
					/>
					<StyledUnderline />
				</StyledFormElement>

				<StyledButtonContent>
					<LightboxButton
						onClick={() =>
							handleSubmit(user, displayName, profileImage, setLoading, () => {
								onProfileUpdate({
									...user,
									displayName,
									photoURL: user.photoURL
								});
								onClose();
							})
						}
						disabled={loading}
					>
						{loading ? 'Saving...' : 'Save Changes'}
					</LightboxButton>
					<LightboxButton onClick={onClose}>Cancel</LightboxButton>
				</StyledButtonContent>
			</LightboxContainer>
		</LightboxBackground>
	);
};

// Función para manejar el cambio de imagen
const handleImageChange = (event, setProfileImage, setPreviewURL) => {
	if (event.target.files && event.target.files[0]) {
		const file = event.target.files[0];
		setProfileImage(file);

		// Crea una URL para la vista previa
		const reader = new FileReader();
		reader.onloadend = () => {
			setPreviewURL(reader.result);
		};
		reader.readAsDataURL(file);
	}
};

// Función para manejar el envío del formulario
const handleSubmit = async (
	user,
	displayName,
	profileImage,
	setLoading,
	setError,
	onSuccess
) => {
	setLoading(true);
	setError(null);

	try {
		let photoURL = user.photoURL;

		// Si el usuario selecciona una nueva imagen, la subimos a Firebase Storage
		if (profileImage) {
			const nameWithoutExtension = profileImage.name.substring(
				0,
				profileImage.name.lastIndexOf('.')
			);
			const finalName = `${nameWithoutExtension}-${v4()}`;
			const storageRef = ref(storage, `profileImages/${finalName}`);

			const upload = await uploadBytes(storageRef, profileImage);
			photoURL = await getDownloadURL(storageRef);

			console.log('Uploaded Image:', upload);
			console.log('Image URL:', photoURL);
		}

		// Actualizar el perfil del usuario en Firebase
		await updateProfile(auth.currentUser, {
			displayName,
			photoURL
		});

		// Actualiza el estado del usuario con la nueva información
		onSuccess();
	} catch (error) {
		setError('Error updating profile: ' + error.message);
	} finally {
		setLoading(false);
	}
};

export default EditProfile;
