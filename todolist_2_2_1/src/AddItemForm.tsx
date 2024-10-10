import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
	addItem: (title: string) => void
}

const AddItemForm = (props: PropsType) => {
	const [error, setError] = useState<string | null>(null);
	const [taskTitle, setTaskTitle] = useState('');

	const addItem = () => {
		if (taskTitle.trim() !== '') {
			props.addItem(taskTitle.trim());
			setTaskTitle('');
		} else {
			setError('Title is required');
		}
	}
	const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value);
	}
	const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addItem();
		}
	}

	return (
		<div>
			<input
				className={error ? 'error' : ''}
				value={taskTitle}
				onChange={changeItemTitleHandler}
				onKeyUp={addItemOnKeyUpHandler}
			/>
			<Button title={'+'} onClick={addItem}/>
			{error && <div className={'error-message'}>{error}</div>}
		</div>
	)
}

export default AddItemForm;
