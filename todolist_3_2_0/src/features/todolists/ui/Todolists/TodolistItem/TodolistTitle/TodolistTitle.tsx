import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTodolistTitleAC, deleteTodolistAC} from '@/features/todolists/model/todolists-reducer';
import {useAppDispatch} from '@/common/hooks/useAppDispatch';
import {Todolist} from '@/app/App';
import s from './TodolistTitle.module.css';

type Props = {
  todolist: Todolist
}

const TodolistTitle = ({todolist}: Props) => {
  const {id, title} = todolist

  const dispatch = useAppDispatch()

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistAC({id}))
  }

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleAC({id, title}))
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
      </h3>
      <IconButton onClick={deleteTodolistHandler}>
        <DeleteIcon/>
      </IconButton>
    </div>
  )
}

export default TodolistTitle;
