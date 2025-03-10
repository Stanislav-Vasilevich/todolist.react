import {ChangeEvent, JSX} from 'react';
import {TaskType} from '../../App';
import s from './TaksList.module.css';

type PropsType = {
  tasks: Array<TaskType>
  deleteTask: (id: string) => void
  changeTaskStatus: (id: string, isDone: boolean) => void
}

const TaskList = (props: PropsType) => {
  const deleteTaskHandler = (id: string) => {
    props.deleteTask(id);
  }

  const listItems: JSX.Element[] = props.tasks.map(i => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(i.id, e.target.checked);
    }

    return (
      <li className={s.list__item} key={i.id}>
        <input className={s.checkbox} type="checkbox" checked={i.isDone} onChange={(e) => changeTaskStatusHandler(e)}/> <span className={s.title}>{i.title}</span>
        <button className={s.button} onClick={() => deleteTaskHandler(i.id)}>x</button>
      </li>
    )
  });

  return props.tasks.length === 0
    ? <span>Ваш список пуст!</span>
    : <ul className={s.list}>{listItems}</ul>
};

export default TaskList;
