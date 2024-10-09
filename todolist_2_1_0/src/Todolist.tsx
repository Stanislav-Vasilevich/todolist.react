import React, {useState, KeyboardEvent, ChangeEvent} from 'react'
import {FilterValuesType, TaskType} from './App'
import {Button} from './Button'

type TodolistPropsType = {
  todolistId: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  addTask: (title: string, todolistId: string) => void
  removeTask: (taskId: string, todolistId: string) => void
  changeTodolistFilter: (newFilter: FilterValuesType, todolistId: string) => void
  setTaskNewStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
  const [taskTitle, setTaskTitle] = useState('')
  const [taskInputError, setTaskInputError] = useState(false)

  const tasksList: JSX.Element = props.tasks.length === 0
    ? <div>Ваш список дел пуст</div>
    : <ul>
      {
        props.tasks.map((t: TaskType) => {
          const removeTaskHandler = () => props.removeTask(t.id, props.todolistId)
          const setTaskNewStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.setTaskNewStatus(t.id, e.currentTarget.checked, props.todolistId)
          return (
            <li>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={setTaskNewStatusHandler}
              />
              <span className={t.isDone ? 'task-done' : 'task'}>{t.title}</span>
              <Button
                title="x"
                onClickHandler={removeTaskHandler}
              />
            </li>
          )
        })
      }
    </ul>

  const onClickAddTaskHandler = () => {
    const trimmedTaskTitle = taskTitle.trim()
    if (trimmedTaskTitle) {
      if (isTitleLengthValid) {
        props.addTask(trimmedTaskTitle, props.todolistId)
        setTaskTitle('')
      }
    } else {
      setTaskInputError(true)
      setTaskTitle('')
    }


  }
  const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddTaskHandler()
    }
  }
  const isTitleLengthValid = taskTitle.length < 15
  return (
    <div className="todolist">
      <h3 className="title">{props.title}</h3>
      <button className="button-close" onClick={() => props.removeTodolist(props.todolistId)}>Х</button>
      <div>
        <input
          placeholder="max 15 characters"
          value={taskTitle}
          onChange={e => {
            taskInputError && setTaskInputError(false)
            setTaskTitle(e.currentTarget.value)
          }
          }
          className={taskInputError ? 'error' : ''}
          onKeyDown={onKeyDownAddTaskHandler}
        />
        <Button
          title="+"
          onClickHandler={onClickAddTaskHandler}
          isDisabled={!isTitleLengthValid}
        />
        {!isTitleLengthValid && <div style={{color: 'red'}}>Max length title is 15 characters!</div>}
        {taskInputError && <div style={{color: 'red'}}>Title is required!</div>}

      </div>
      {tasksList}
      <div>
        <Button
          title="Все"
          classes={props.filter === 'all' ? 'btn-filter-active' : ''}
          onClickHandler={() => props.changeTodolistFilter('all', props.todolistId)}
        />
        <Button
          title="В работе"
          classes={props.filter === 'active' ? 'btn-filter-active' : ''}
          onClickHandler={() => props.changeTodolistFilter('active', props.todolistId)}
        />
        <Button
          title="Выполненные"
          classes={props.filter === 'completed' ? 'btn-filter-active' : ''}
          onClickHandler={() => props.changeTodolistFilter('completed', props.todolistId)}
        />
      </div>
    </div>
  )
}
