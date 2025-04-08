import * as React from 'react';
import s from './TodolistTitle.module.css';
import EditableSpan from '../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

type PropsType = {
  todolistId: string
  title: string
  deleteTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  editMode: boolean
  setEditMode: (mode: boolean) => void
}

const TodolistTitle: React.FC<PropsType> = ({todolistId, title, deleteTodolist, editMode, setEditMode}) => {
  const changeTodolistTitleHandler = () => {
    if(!editMode) {
      deleteTodolist(todolistId);
    }

    setEditMode(false);
  }

  return (
    <div className={s.heading}>
      <EditableSpan className={s.title} title={title} isEdit={editMode} setEditMode={setEditMode}/>
      <IconButton aria-label="delete">
        <DeleteIcon fontSize="inherit" onClick={changeTodolistTitleHandler} />
      </IconButton>
    </div>
  )
};

export default TodolistTitle;
