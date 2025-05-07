import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {ChangeEvent} from 'react/index';
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from '@/features/todolists/model/tasks-reducer';
import {Todolist} from '@/features/todolists/model/todolists-reducer';
import {useAppDispatch} from '@/common/hooks/useAppDispatch';
import {ListItem} from '@mui/material';
import {getListItemSx} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles';

type Props = {
  task: Task
  todolist: Todolist
}

const TaskItem = ({task, todolist}: Props) => {
  const {id} = todolist;

  const dispatch = useAppDispatch();

  const deleteTask = () => {
    dispatch(deleteTaskAC({todolistId: id, taskId: task.id}))
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(changeTaskStatusAC({todolistId: id, taskId: task.id, isDone: newStatusValue}))
  }

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({todolistId: id, taskId: task.id, title}))
  }

  return (
    <ListItem sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
        <EditableSpan value={task.title} onChange={changeTaskTitle}/>
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon/>
      </IconButton>
    </ListItem>
  );
};

export default TaskItem;
