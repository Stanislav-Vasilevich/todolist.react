import * as React from 'react';
import TodolistTitle from '../TodolistTitle';
import AddTasksForm from '../AddTasksForm/AddTasksForm';
import TasksList from '../TaskList/TaskList';
import FilterButtons from '../FilterButtons/FilterButtons';
import {TasksType} from '../../../../todolist_2_1/src/App';
import {FilteredTaskType} from '../../App';
import s from './Todolist.module.css';

type PropsType = {
  title: string
  tasks: Array<TasksType>
  deleteTask: (id: string) => void
  changeTaskStatus: (id: string, isDone: boolean) => void
  createTask: (title: string) => void
  filterTasks: (value: FilteredTaskType) => void
  filter: FilteredTaskType
}

const Todolist: React.FC<PropsType> = ({
                                         title,
                                         tasks,
                                         deleteTask,
                                         changeTaskStatus,
                                         createTask,
                                         filterTasks,
                                         filter,
                                       }) => {
  return (
    <div className={s.todolist}>
      <TodolistTitle title={title}/>
      <AddTasksForm createTask={createTask}/>
      <FilterButtons filterTasks={filterTasks} filter={filter}/>
      <TasksList
        tasks={tasks}
        deleteTask={deleteTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
};

export default Todolist;
