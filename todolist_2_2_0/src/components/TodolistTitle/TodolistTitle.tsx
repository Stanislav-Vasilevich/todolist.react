import * as React from 'react';
import {MouseEvent, useState} from 'react';
import s from './TodolistTitle.module.css';
import EditableSpan from '../EditableSpan/EditableSpan';

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

  return <div className={s.heading}>
    <h3 className={s.title}>
      <EditableSpan title={title} isEdit={editMode} setEditMode={setEditMode}/>
    </h3>
    <button className={s.button} onClick={changeTodolistTitleHandler}>{editMode ? 'save' : 'x'}</button>
  </div>;
};

export default TodolistTitle;
