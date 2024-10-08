import {FC} from 'react';
import s from './Button.module.css';

type PropsType = {
	name: string
	className?: string
	onClick: (value: string) => void
}

const Button: FC<PropsType> = ({name, onClick, className}) => {
	console.log('className: ', className)
	return <button className={className ? `${s.active} ${s.button}` : s.button} onClick={() => onClick(name)}>{name}</button>
}

export default Button;
