import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}
export type TasksStateType = {
	[key: string]: TaskType[]
}

function App() {
	let todolistID = v1();
	let todolistID1 = v1();
	let todolistID2 = v1();

	const [todolists, setTodolists] = useState<Array<TodolistType>>([
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	]);
	const [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todolistID2]: [
			{id: v1(), title: 'Rest API', isDone: true},
			{id: v1(), title: 'GraphQL', isDone: false},
		],
	});

	const removeTask = (taskId: string, todolistId: string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
	}
	const addTask = (title: string, todolistId: string) => {
		const newTask = {id: v1(), title, isDone: false};
		const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]};

		setTasks(newTodolistTasks);
	}
	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)});
	}
	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
	}
	const removeTodolist = (todolistId: string) => {
		setTodolists(todolists.filter(tl => tl.id !== todolistId));

		delete tasks[todolistId]
		setTasks({...tasks})
	}
	const addTodolist = (title: string) => {
		setTodolists([{id: todolistID, title, filter: 'all'}, ...todolists]);
		setTasks({[todolistID]: [], ...tasks});
	}
	const changeTodolistTitle = (todolistId: string, title: string) => {
		setTodolists(todolists.map(t => t.id === todolistId ? {...t, title} : t));
	}
	const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)});
	}

	return (
		<div className="App">
			<AddItemForm addItem={addTodolist}/>
			{todolists.map((tl) => {
				const allTodolistTasks = tasks[tl.id];
				let tasksForTodolist = allTodolistTasks;

				if (tl.filter === 'active') {
					tasksForTodolist = allTodolistTasks.filter(task => !task.isDone);
				}

				if (tl.filter === 'completed') {
					tasksForTodolist = allTodolistTasks.filter(task => task.isDone);
				}

				return <Todolist
					key={tl.id}
					todolistId={tl.id}
					title={tl.title}
					tasks={tasksForTodolist}
					removeTask={removeTask}
					changeFilter={changeFilter}
					addTask={addTask}
					changeTaskStatus={changeTaskStatus}
					filter={tl.filter}
					removeTodolist={removeTodolist}
					changeTodolistTitle={changeTodolistTitle}
					changeTaskTitle={changeTaskTitle}
				/>
			})}
		</div>
	);
}

export default App;
