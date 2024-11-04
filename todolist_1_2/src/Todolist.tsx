import React, {useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
  removeTasks: () => void
}

export function Todolist(props: PropsType) {
  let [filter, setFilter] = useState<FilterValuesType>('all');

  let tasksForTodolist = props.tasks;

  if (filter === 'active') {
    tasksForTodolist = props.tasks.filter(t => !t.isDone);
  }
  if (filter === 'completed') {
    tasksForTodolist = props.tasks.filter(t => t.isDone);
  }
  if (filter === 'three') {
    tasksForTodolist = props.tasks.filter((t, index) => index < 3 && t);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input/>
      <button>+</button>
    </div>
    <ul>
      {
        tasksForTodolist.map(t => <li key={t.id}>
          <input type="checkbox" checked={t.isDone}/>
          <span>{t.title}</span>
          <button onClick={() => {
            props.removeTask(t.id)
          }}>x
          </button>
        </li>)
      }
    </ul>
    <button className="button" onClick={props.removeTasks}>DELETE ALL TASKS</button>
    <div>
      <button className="button" onClick={() => {
        changeFilter('all')
      }}>All
      </button>
      <button className="button" onClick={() => {
        changeFilter('active')
      }}>Active
      </button>
      <button className="button" onClick={() => {
        changeFilter('completed')
      }}>Completed
      </button>
      <button className="button" onClick={() => {
        changeFilter('three')
      }}>3 tasks
      </button>
    </div>
  </div>
}
