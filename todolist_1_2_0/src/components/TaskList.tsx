import {TasksType} from '../../../todolist_2_1/src/App';
import {ChangeEvent, JSX} from 'react';

type PropsType = {
  tasks: Array<TasksType>
  deleteTask: (id: number) => void
  changeTaskStatus: (id: number, isDone: boolean) => void
}

const TaskList = (props: PropsType) => {
  const deleteTaskHandler = (id: number) => {
    props.deleteTask(id);
  }

  const listItems: JSX.Element[] = props.tasks.map(i => {
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(i.id, e.target.checked);
    }

    return (
      <li key={i.id}>
        <input type="checkbox" checked={i.isDone} onChange={(e) => changeTaskStatusHandler(e)}/> <span>{i.title}</span>
        <button onClick={() => deleteTaskHandler(i.id)}>x</button>
      </li>
    )
  });

  return props.tasks.length === 0
    ? <span>Ваш список пуст!</span>
    : <ul>{listItems}</ul>
};

export default TaskList;
