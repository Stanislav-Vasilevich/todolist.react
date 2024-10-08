import {FilterValuesType} from "../App/App";
import {FC} from 'react';

type PropsType = {
	name: string
	onClick: (value: string) => void
}

const Button: FC<PropsType> = ({name, onClick}) => {
	return <button onClick={() => onClick(name)}>{name}</button>
}

export default Button;
