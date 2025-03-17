import * as React from 'react';

type PropsType = {
  title: string
}

const TodolistTitle: React.FC<PropsType> = ({title}) => {
  return <h3>{title}</h3>;
};

export default TodolistTitle;
