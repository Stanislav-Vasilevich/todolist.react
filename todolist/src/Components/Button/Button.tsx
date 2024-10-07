import {FilterValuesType} from "../../App";

type PropsType = {
	name: FilterValuesType
	changeFilter: (value: FilterValuesType) => void
}

const Button = ({name, changeFilter}: PropsType) => <button onClick={() => changeFilter(name)}>{name}</button>

export default Button;
