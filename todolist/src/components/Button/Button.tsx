import {FilterValuesType} from "../App/App";
import {FC} from 'react';

type PropsType = {
	name: FilterValuesType
	changeFilter: (value: FilterValuesType) => void
}

const Button: FC<PropsType> = ({name, changeFilter}) => {
	return <button onClick={() => changeFilter(name)}>{name}</button>
}

export default Button;
