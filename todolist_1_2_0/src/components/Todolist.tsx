import * as React from 'react';
import TodolistTitle from './TodolistTitle';
import AddTasksForm from './AddTasksForm';
import TasksList from './TaskList';
import FilterButtons from './FilterButtons/FilterButtons';
import {TasksType} from '../../../todolist_2_1/src/App';
import {FilteredTaskType} from '../App';

type PropsType = {
  title: string
  tasks: Array<TasksType>
  deleteTask: (id: number) => void
  changeTaskStatus: (id: number, isDone: boolean) => void
  filterTasks: (value: FilteredTaskType) => void
  filter: FilteredTaskType
}

const Todolist: React.FC<PropsType> = ({
                                         title,
                                         tasks,
                                         deleteTask,
                                         changeTaskStatus,
                                         filterTasks,
                                         filter
                                       }) => {
  return (
    <div>
      <TodolistTitle title={title}/>
      <AddTasksForm/>
      <TasksList tasks={tasks} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus}/>
      <FilterButtons filterTasks={filterTasks} filter={filter}/>
    </div>
  );
};

export default Todolist;
