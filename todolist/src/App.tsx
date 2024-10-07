import './App.css';
import Todolist from "./Components/Todolist/Todolist";
import {useState} from "react";

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
	const [tasks, setTasks] = useState<Array<TaskType>>([
		{ id: 1, title: 'HTML&CSS', isDone: true },
		{ id: 2, title: 'JS', isDone: true },
		{ id: 3, title: 'ReactJS', isDone: false },
		{ id: 4, title: 'Redux', isDone: false },
		{ id: 5, title: 'Typescript', isDone: false },
		{ id: 6, title: 'RTK query', isDone: false },
	]);
	const [filter, setFilter] = useState<FilterValuesType>('all');

	const removeTask = (taskId: number) => {
		const newTasks = tasks.filter(t => t.id !== taskId);
		setTasks(newTasks);
	}

	const changeFilter = (value: FilterValuesType) => {
		setFilter(value);
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
							date={'13.09.2024'}
							removeTask={removeTask}
							changeFilter={changeFilter}
						/>
        </div>
    );
}

export default App;
