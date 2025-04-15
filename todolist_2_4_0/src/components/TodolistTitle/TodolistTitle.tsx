import * as React from 'react';
import s from './TodolistTitle.module.css';
import EditableSpan from '../EditableSpan/EditableSpan';

type PropsType = {
  title: string
  deleteTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  setEditMode: (mode: boolean) => void
}

const TodolistTitle: React.FC<PropsType> = ({title, editMode, setEditMode}) => {
  return (
    <div className={s.heading}>
      <EditableSpan title={title} isEdit={editMode} setEditMode={setEditMode}/>
    </div>
  )
};

export default TodolistTitle;
