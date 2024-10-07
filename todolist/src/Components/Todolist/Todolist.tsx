import {FilterValuesType, TaskType} from "../../App";
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
			<h3>{title}</h3>
			<div>
				<input/>
				<button>+</button>
			</div>
			<ul>
				{
					tasks.length === 0
						? <div>-- no tasks --</div>
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
			<div>{date}</div>
			<div>
				<Button name={'all'} changeFilter={() => changeFilter('all')}/>
				<Button name={'active'} changeFilter={() => changeFilter('active')}/>
				<Button name={'completed'} changeFilter={() => changeFilter('completed')}/>
			</div>
		</div>
	);
};

export default Todolist;
