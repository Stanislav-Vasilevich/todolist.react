import './App.css';
import Todolist from "../Todolist/Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
	const [tasks, setTasks] = useState<Array<TaskType>>([
		{ id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'ReactJS', isDone: false },
		{ id: v1(), title: 'Redux', isDone: false },
		{ id: v1(), title: 'Typescript', isDone: false },
		{ id: v1(), title: 'RTK query', isDone: false },
	]);
	const [filter, setFilter] = useState<FilterValuesType>('all');
	const [date, setDate] = useState(new Date());

	const nowDate = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}г.`;

	const removeTask = (taskId: string) => {
		const newTasks = tasks.filter(t => t.id !== taskId);
		setTasks(newTasks);
	}
	const changeFilter = (value: FilterValuesType) => {
		setFilter(value);
	}

	const addTask = (title: string) => {
		const task = { id: v1(), title, isDone: false };
		const newTasks = [task, ...tasks];
		setTasks(newTasks);
	}

	let filteredTasks = tasks;
	if(filter === 'active') {
		filteredTasks = tasks.filter(t => !t.isDone);
	}
	if(filter === 'completed') {
		filteredTasks = tasks.filter(t => t.isDone);
	}

    return (
        <div className="App">
            <Todolist
							title={'What to learn?'}
							tasks={filteredTasks}
							date={nowDate}
							removeTask={removeTask}
							changeFilter={changeFilter}
							addTask={addTask}
						/>
        </div>
    );
}

export default App;
