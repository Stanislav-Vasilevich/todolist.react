import * as React from 'react';
import s from './TodolistTitle.module.css';

type PropsType = {
  todolistId: string
  title: string
  deleteTodolist: (todolistId: string) => void
}

const TodolistTitle: React.FC<PropsType> = ({todolistId, title, deleteTodolist}) => {
  return <div className={s.heading}>
    <h3 className={s.title}>{title}</h3>
    <button className={s.button} onClick={() => deleteTodolist(todolistId)}>x</button>
  </div>;
};

export default TodolistTitle;
