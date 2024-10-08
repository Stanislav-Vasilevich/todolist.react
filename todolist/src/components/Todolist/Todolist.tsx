import {FilterValuesType, TaskType} from "../App/App";
import s from './Todolist.module.css';
import Button from "../Button/Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
	title: string
	tasks: Array<TaskType>
	date?: string
	removeTask: (taskId: string) => void
	changeFilter: (value: FilterValuesType) => void
	addTask: (id: string) => void
}

const Todolist = ({title, tasks, date, removeTask, changeFilter, addTask}: PropsType) => {
	const [value, setValue] = useState('');

	const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
	}
	const addTaskHandler = () => {
		addTask(value);
		setValue('');
	}
	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			addTaskHandler();
		}
	}
	const changeFilterHandler = (filter: FilterValuesType) => {
		changeFilter(filter);
	}

	return (
		<div>
			<h3 className={s.title}>{title}</h3>
			<div className={s.date}>{date}</div>
			<div className={s.input}>
				<input onChange={changeValue} value={value} onKeyUp={onKeyPressHandler}/>
				<Button name={'+'} onClick={addTaskHandler}/>
			</div>
			<ul>
				{
					!tasks.length
						? <div className={s.not}>-- no tasks --</div>
						: tasks.map(t => {
							return (
								<li key={t.id}>
									<input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
									<button onClick={() => removeTask(t.id)}>X
									</button>
								</li>
							)
						})
				}
			</ul>
			<div>
				<Button name={'All'} onClick={() => changeFilterHandler('all')}/>
				<Button name={'Active'} onClick={() => changeFilterHandler('active')}/>
				<Button name={'Completed'} onClick={() => changeFilterHandler('completed')}/>
			</div>
		</div>
	);
};

export default Todolist;
