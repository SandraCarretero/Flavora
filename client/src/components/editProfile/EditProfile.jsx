import { useState } from 'react';
import {
	StyledLightboxBackground,
	StyledLightboxButton,
	StyledLightboxContainer,
	StyledLightboxHeader,
	StyledPreviewImage,
	StyledButtonContent,
	StyledContainerImg,
	StyledDelete,
	StyledFormElement,
	StyledInput,
	StyledInputImg,
	StyledLabelImg,
	StyledUnderline,
	StyledPhotoBox,
	StyledColorImg
} from './editProfile.styles';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '../../config/firebase.config';
import { deleteUser, updateProfile } from 'firebase/auth';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ onClose, user, onProfileUpdate }) => {
	const navigate = useNavigate();

	const [displayName, setDisplayName] = useState(user.displayName || '');
	const [previewURL, setPreviewURL] = useState(user.photoURL || ''); 
	const [profileImage, setProfileImage] = useState(null);
	const [loading, setLoading] = useState(false);

	return (
		<StyledLightboxBackground onClick={onClose}>
			<StyledLightboxContainer onClick={e => e.stopPropagation()}>
				<StyledLightboxHeader>Editar Perfil</StyledLightboxHeader>

				<StyledContainerImg>
					<StyledPhotoBox>
						{previewURL ? (
							<StyledPreviewImage src={previewURL} alt='Preview' />
						) : (
							<StyledColorImg>
								{displayName
									? displayName.charAt(0).toUpperCase() 
									: user.email.charAt(0).toUpperCase()}{' '}
							</StyledColorImg>
						)}
					</StyledPhotoBox>
					<StyledInputImg
						id='photo'
						type='file'
						name='photo'
						accept='image/*'
						onChange={e => handleImageChange(e, setProfileImage, setPreviewURL)}
					/>
					<StyledLabelImg htmlFor='photo'>+</StyledLabelImg>
				</StyledContainerImg>

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
					<StyledLightboxButton
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
					</StyledLightboxButton>
					<StyledLightboxButton onClick={onClose}>Cancel</StyledLightboxButton>
					<StyledDelete
						src='images/delete.svg'
						alt=''
						onClick={() => handleDelete(navigate)}
					/>
				</StyledButtonContent>
			</StyledLightboxContainer>
		</StyledLightboxBackground>
	);
};

const handleImageChange = (event, setProfileImage, setPreviewURL) => {
	if (event.target.files && event.target.files[0]) {
		const file = event.target.files[0];
		setProfileImage(file);

		const reader = new FileReader();
		reader.onloadend = () => {
			setPreviewURL(reader.result);
		};
		reader.readAsDataURL(file);
	}
};

const handleDelete = async navigate => {
	try {
		await deleteUser(auth.currentUser);
		navigate('/');
	} catch (error) {
		console.error('Error al eliminar usuario:', error.message);
	}
};

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

		await updateProfile(auth.currentUser, {
			displayName,
			photoURL
		});

		onSuccess();
	} catch (error) {
		setError('Error updating profile: ' + error.message);
	} finally {
		setLoading(false);
	}
};

export default EditProfile;
