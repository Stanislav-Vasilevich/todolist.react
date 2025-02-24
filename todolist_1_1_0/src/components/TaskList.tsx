import {TasksType} from '../../../todolist_2_1/src/App';
import {JSX} from 'react';

type PropsType = {
  tasks: Array<TasksType>
}

const TaskList: React.FC<PropsType> = ({tasks}) => {
  const listItems: JSX.Element[] = tasks.map(i => {
    return (
      <li key={i.id}>
        <input type="checkbox" checked={i.isDone}/> <span>{i.title}</span>
      </li>
    )
  });

  return tasks.length === 0
    ? <span>Ваш список пуст!</span>
    : <ul>{listItems}</ul>
};

export default TaskList;
