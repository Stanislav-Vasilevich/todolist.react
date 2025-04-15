import {ChangeEvent, JSX} from 'react';
import {TaskType} from '../../App';
import EditableSpan from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {getListItemSx} from '../../Todolist.styles';

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
      <ListItem key={i.id} disablePadding sx={getListItemSx(i.isDone)}> {/* disablePadding - убирает отступы у списка */}
        <div>
          <Checkbox checked={i.isDone} onChange={changeTaskStatusHandler}/>
          <EditableSpan classes={i.isDone} title={i.title}/>
        </div>
        <IconButton>
          <DeleteIcon onClick={changeTaskTitleHandler}/>
        </IconButton>
      </ListItem>
    )
  });

  return props.tasks.length === 0
    ? <span>Ваш список пуст!</span>
    : <List>{listItems}</List>
};

export default TaskList;
