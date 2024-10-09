import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}
export type TasksType = {
	[todolistId: string]: Array<TaskType>
}

function App() {
	const todolistId_1 = v1();
	const todolistId_2 = v1();

	const [todolist, setTodolist] = useState<Array<TodolistType>>([
		{id: todolistId_1, title: 'What to learn', filter: 'all'},
		{id: todolistId_2, title: 'What to buy', filter: 'all'},
	]);

	const [tasks, setTasks] = useState<TasksType>({
		[todolistId_1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todolistId_2]: [
			{id: v1(), title: 'book', isDone: true},
			{id: v1(), title: 'milk', isDone: true},
			{id: v1(), title: 'meet', isDone: false},
			{id: v1(), title: 'bread', isDone: false},
		],
})

	const changeFilter = (todolistId: string, filter: FilterValuesType) => {
		setTodolist(todolist.map(t => t.id === todolistId ? {...t, filter} : t));
	}
	const removeTask = (todolistId: string, taskId: string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
	}
	const addTask = (todolistId: string, title: string) => {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false
		}

		setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
	}
	const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)});
	}
	const deleteTodolist = (todolistId: string) => {
		setTodolist(todolist.filter(t => t.id !== todolistId));
		delete tasks[todolistId];
		setTasks({...tasks});
	}

	return (
		<div className="App">
			{
				todolist.map(t => {
					let tasksForTodolist = tasks[t.id]
					if (t.filter === 'active') {
						tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
					}

					if (t.filter === 'completed') {
						tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
					}

					return (
						<Todolist
							key={t.id}
							todolistId={t.id}
							title={t.title}
							tasks={tasksForTodolist}
							removeTask={removeTask}
							changeFilter={changeFilter}
							addTask={addTask}
							changeTaskStatus={changeTaskStatus}
							deleteTodolist={deleteTodolist}
							filter={t.filter}
						/>
					)
				})
			}
		</div>
	);
}

export default App;
