import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {Button} from "./Button";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type PropsType = {
	title: string
	todolistId: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
	changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
	changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		props.changeFilter(filter, props.todolistId);
	}
	const removeTodolistHandler = () => {
		props.removeTodolist(props.todolistId);
	}
	const addTask = (title: string) => {
		props.addTask(title, props.todolistId);
	}
	const changeTodolistTitle = (newTitle: string) => {
		props.changeTodolistTitle(props.todolistId, newTitle);
	}

	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3>
					<EditableSpan title={props.title} callback={changeTodolistTitle}/>
				</h3>
				<Button title={'x'} onClick={removeTodolistHandler}/>
			</div>
			<AddItemForm addItem={addTask}/>
			{
				props.tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{props.tasks.map((t) => {
							const removeTaskHandler = () => {
								props.removeTask(t.id, props.todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								props.changeTaskStatus(t.id, newStatusValue, props.todolistId)
							}

							const changeTaskTitle = (title: string) => {
								props.changeTaskTitle(props.todolistId, t.id, title);
							}

							return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
								<EditableSpan title={t.title} callback={changeTaskTitle}/>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={props.filter === 'all' ? 'active-filter' : ''} title={'All'}
								onClick={() => changeFilterTasksHandler('all')}/>
				<Button className={props.filter === 'active' ? 'active-filter' : ''} title={'Active'}
								onClick={() => changeFilterTasksHandler('active')}/>
				<Button className={props.filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
								onClick={() => changeFilterTasksHandler('completed')}/>
			</div>
		</div>
	)
}

