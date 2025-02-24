import * as React from 'react';
import TodolistTitle from './TodolistTitle';
import AddTasksForm from './AddTasksForm';
import TasksList from './TaskList';
import FilterButtons from './FilterButtons';
import {TasksType} from '../../../todolist_2_1/src/App';

type PropsType = {
  title: string
  tasks: Array<TasksType>
}

const Todolist: React.FC<PropsType> = ({title, tasks}) => {
  return (
    <div>
      <TodolistTitle title={title}/>
      <AddTasksForm/>
      <TasksList tasks={tasks}/>
      <FilterButtons/>
    </div>
  );
};

export default Todolist;
