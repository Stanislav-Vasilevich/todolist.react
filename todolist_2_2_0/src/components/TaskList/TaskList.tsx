import {ChangeEvent, JSX} from 'react';
import {TaskType} from '../../App';
import s from './TaksList.module.css';
import EditableSpan from '../EditableSpan/EditableSpan';

type PropsType = {
  todolistId: string
  tasks: Array<TaskType>
  deleteTask: (todolistId: string, id: string) => void
  changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
  changeTaskTitle: (todolist: string, taskId: string, title: string) => void
}

const TaskList = (props: PropsType) => {
  const deleteTaskHandler = (id: string) => {
    props.deleteTask(props.todolistId, id);
  }

  const listItems: JSX.Element[] = props.tasks.map(i => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(props.todolistId, i.id, e.target.checked);
    }

    const changeTaskTitleHandler = () => {
      deleteTaskHandler(i.id);
    }

    return (
      <li className={s.list__item} key={i.id}>
        <input className={s.checkbox}
               type="checkbox"
               checked={i.isDone}
               onChange={(e) => changeTaskStatusHandler(e)}
        />
        <EditableSpan classes={i.isDone} title={i.title}/>
        <button className={s.button} onClick={changeTaskTitleHandler}>x</button>
      </li>
    )
  });

  return props.tasks.length === 0
    ? <span>Ваш список пуст!</span>
    : <ul className={s.list}>{listItems}</ul>
};

export default TaskList;
