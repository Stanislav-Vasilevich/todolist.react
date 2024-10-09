import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
	todolistId: string
	title: string
	tasks: TaskType[]
	removeTask: (todolistId: string, taskId: string) => void
	changeFilter: (todolistId: string, filter: FilterValuesType) => void
	addTask: (todolistId: string, title: string) => void
	changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
	deleteTodolist: (todolistId: string) => void
	filter: FilterValuesType
}

export const Todolist = (props: PropsType) => {
	const {title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus} = props
	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null);

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		props.changeFilter(props.todolistId, filter);
	}
	const addTaskHandler = () => {
		if (taskTitle.trim() !== '') {
			props.addTask(props.todolistId, taskTitle.trim())
			setTaskTitle('')
		} else {
			setError('Title is required')
		}
	}
	const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
	}
	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addTaskHandler()
		}
	}
	const deleteTodolistHandler = () => {
		props.deleteTodolist(props.todolistId);
	}

	return (
		<div>
			<h3>
				{title}
				<Button title={'X'} onClick={deleteTodolistHandler}/>
			</h3>
			<div>
				<input
					className={error ? 'error' : ''}
					value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler}
				/>
				<Button title={'+'} onClick={addTaskHandler}/>
				{error && <div className={'error-message'}>{error}</div>}
			</div>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(props.todolistId, task.id);
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								props.changeTaskStatus(props.todolistId, task.id, e.currentTarget.checked);
							}

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
								<span>{task.title}</span>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
								onClick={() => changeFilterTasksHandler('all')}/>
				<Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
								onClick={() => changeFilterTasksHandler('active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
								onClick={() => changeFilterTasksHandler('completed')}/>
			</div>
		</div>
	)
}
