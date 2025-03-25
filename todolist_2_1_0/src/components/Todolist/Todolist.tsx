import * as React from 'react';
import TodolistTitle from '../TodolistTitle/TodolistTitle';
import AddTasksForm from '../AddTasksForm/AddTasksForm';
import TasksList from '../TaskList/TaskList';
import FilterButtons from '../FilterButtons/FilterButtons';
import {TasksType} from '../../../../todolist_2_1/src/App';
import {FilteredTaskType} from '../../App';
import s from './Todolist.module.css';
import FilterSelect from '../FilterSelect/FilterSelect';

type PropsType = {
  id: string
  title: string
  tasks: Array<TasksType>
  deleteTask: (todolistId: string, id: string) => void
  changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
  createTask: (todolistId: string, title: string) => void
  filterTasks: (todolistId: string, value: FilteredTaskType) => void
  filter: FilteredTaskType
  deleteTodolist: (todolistId: string) => void
}

const Todolist: React.FC<PropsType> = (
  {
    id,
    title,
    tasks,
    deleteTask,
    changeTaskStatus,
    createTask,
    filterTasks,
    filter,
    deleteTodolist
  }) => {
  return (
    <div className={s.todolist}>
      <TodolistTitle todolistId={id} title={title} deleteTodolist={deleteTodolist}/>
      <AddTasksForm todolistId={id} createTask={createTask} minCharter={2} maxCharter={20}/>
      <FilterSelect todolistId={id} filterTasks={filterTasks} filter={filter}/>
      <TasksList
        todolistId={id}
        tasks={tasks}
        deleteTask={deleteTask}
        changeTaskStatus={changeTaskStatus}
      />
      <FilterButtons todolistId={id} filterTasks={filterTasks} filter={filter}/>
    </div>
  );
};

export default Todolist;
