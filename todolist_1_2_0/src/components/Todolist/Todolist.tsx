import {TaskType} from '../../App';
import {Button} from '../Button/Button';
import {useState} from 'react';
import s from './Todolist.module.css';

export type TypeFilteredTasks = 'all' | 'active' | 'completed';

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskId: string) => void
  addTask: (title: string) => void
}

export const Todolist = ({title, tasks, removeTask, addTask}: PropsType) => {
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState<TypeFilteredTasks>('all');

  const onChangeHandler = (e) => {
    setValue(e.currentTarget.value);
  }

  const addTaskHandler = () => {
    if (value.trim()) {
      addTask(value);
      setValue('');
    }
  }

  const filtered = (filter: TypeFilteredTasks) => {
    setFilter(filter);
  }

  const filteredTasks = () => {
    let tasksForTodolist = tasks;

    switch (filter) {
      case 'active':
        return tasksForTodolist = tasks.filter(t => t.isDone);
      case 'completed':
        return tasksForTodolist = tasks.filter(t => !t.isDone);
      default:
        return tasksForTodolist;
    }
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input onChange={onChangeHandler} value={value}/>
        <Button className={s.button} title={'+'} onClick={addTaskHandler}/>
      </div>
      {
        tasks.length === 0
          ? <p>Тасок нет</p>
          : <ul>
            {filteredTasks().map((task) => {
              const removeTaskHandler = () => {
                removeTask(task.id);
              }

              return (
                <li key={task.id}>
                  <input type="checkbox" checked={task.isDone}/>
                  <span>{task.title}</span>
                  <Button className={s.button} title={'x'} onClick={removeTaskHandler}/>
                </li>
              )
            })}
          </ul>
      }
      <div>
        <Button className={filter === 'all' ? `${s.button} ${s.active}` : s.button} title={'All'}
                onClick={() => filtered('all')}/>
        <Button className={filter === 'active' ? `${s.button} ${s.active}` : s.button} title={'Active'}
                onClick={() => filtered('active')}/>
        <Button className={filter === 'completed' ? `${s.button} ${s.active}` : s.button} title={'Completed'}
                onClick={() => filtered('completed')}/>
      </div>
    </div>
  )
}
