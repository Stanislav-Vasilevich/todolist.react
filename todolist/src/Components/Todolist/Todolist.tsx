import {TaskType} from "../../App";
import Button from "../Button/Button";

type PropsType = {
	title: string
	tasks: Array<TaskType>
	date?: string
}

const Todolist = ({title, tasks, date}: PropsType) => {
	return (
		<div>
			<h3>{title}</h3>
			<div style={{margin: '0 0 10px'}}>
				<Button name={'All'}/>
				<Button name={'Active'}/>
				<Button name={'Completed'}/>
			</div>
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
								</li>
							)
						})
				}
			</ul>
			<div>{date}</div>
		</div>
	);
};

export default Todolist;
