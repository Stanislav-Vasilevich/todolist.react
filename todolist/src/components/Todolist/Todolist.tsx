import {FilterValuesType, TaskType} from "../App/App";
import s from './Todolist.module.css';
import Button from "../Button/Button";

type PropsType = {
	title: string
	tasks: Array<TaskType>
	date?: string
	removeTask: (taskId: number) => void
	changeFilter: (value: FilterValuesType) => void
}

const Todolist = ({title, tasks, date, removeTask, changeFilter}: PropsType) => {
	return (
		<div>
			<h3 className={s.title}>{title}</h3>
			<div className={s.date}>{date}</div>
			<div className={s.input}>
				<input/>
				<button>+</button>
			</div>
			<ul>
				{
					!tasks.length
						? <div className={s.not}>-- no tasks --</div>
						: tasks.map(t => {
							return (
								<li key={t.id}>
									<input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
									<button onClick={() => {removeTask(t.id)}}>X</button>
								</li>
							)
						})
				}
			</ul>
			<div>
				<Button name={'All'} changeFilter={() => changeFilter('All')}/>
				<Button name={'Active'} changeFilter={() => changeFilter('Active')}/>
				<Button name={'Completed'} changeFilter={() => changeFilter('Completed')}/>
			</div>
		</div>
	);
};

export default Todolist;
