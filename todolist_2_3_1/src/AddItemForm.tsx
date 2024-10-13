import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";


type PropsType = {
	addItem: (title:string) => void
}

export const AddItemForm = ({addItem}: PropsType) => {
	const [label, setLabel] = useState('enter text');
	const [value, setValue] = useState('');
	const [error, setError] = useState<boolean>(false)

	const addItemHandler = () => {
		if (value.trim()) {
			setValue('')
			addItem(value.trim())
		} else {
			setLabel('error')
			setError(true)
		}
	}

	const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.currentTarget.value)
		setLabel('enter text')
	}

	const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(false)

		if (event.key === 'Enter') {
			addItemHandler()
		}
	}

	return (
		<div>
			<TextField
				error={error}
				label={label}
				id="outlined-size-small"
				size="small"
				defaultValue={value}
				helperText={error && 'Incorrect entry'}
				className={error ? 'error' : ''}
				onChange={changeItemHandler}
				onKeyUp={addItemOnKeyUpHandler}
			/>
			<Button title={'+'} onClick={addItemHandler}/>
			{error && <div className={'error-message'}>{error}</div>}
		</div>
	)
}


