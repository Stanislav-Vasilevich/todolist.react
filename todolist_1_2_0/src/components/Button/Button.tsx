type ButtonPropsType = {
	title: string
	onClick: () => void
	className: string
}

export const Button = (props: ButtonPropsType) => {
	const onClickHandler = () => {
		props.onClick();
	}

	return <button className={props.className} onClick={onClickHandler}>{props.title}</button>
}
