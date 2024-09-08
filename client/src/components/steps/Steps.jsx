import { StyledContent, StyledImg, StyledTextarea } from './steps.styles';

const Steps = ({ step, onAdd, onDelete, showAddButton, onChange }) => {
	return (
		<StyledContent>
			<StyledTextarea
				placeholder='Pasos a seguir'
				required
				value={step.text}
				onChange={e => handleTextareaChange(e, step.id, onChange)}
			/>
			{onDelete && (
				<StyledImg src='/images/delete.svg' alt='Delete' onClick={onDelete} />
			)}
			{showAddButton && (
				<StyledImg src='/images/add.svg' alt='Add' onClick={onAdd} />
			)}
		</StyledContent>
	);
};

const handleTextareaChange = (e, id, onChange) => {
	onChange(id, e.target.value);
};

export default Steps;
