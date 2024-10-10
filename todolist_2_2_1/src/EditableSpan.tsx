import {ChangeEvent, useState} from "react";

type PropsType = {
	title: string
	callback: (title: string) => void
}

const EditableSpan = (props: PropsType) => {
	const [title, setTitle] = useState('');
	const [editMode, setEditMode] = useState(false);

	const activateEditModeHandler = () => {
		setEditMode(true);
		setTitle(props.title);
	}

	const callback = (newTitle: string) => {
		props.callback(newTitle);
	}

	const deactivateEditModeHandler = () => {
		setEditMode(false);
		callback(title);
	}

	const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	}

	return !editMode
		? <span onDoubleClick={activateEditModeHandler}>{props.title}</span>
		: <input onChange={changeTitleHandler} onBlur={deactivateEditModeHandler} value={title} autoFocus/>
}

export default EditableSpan;
