import * as React from 'react';
import TodolistTitle from '../TodolistTitle/TodolistTitle';
import TasksList from '../TaskList/TaskList';
import FilterButtons from '../FilterButtons/FilterButtons';
import {FilteredTaskType, TaskType} from '../../App';
import s from './Todolist.module.css';
import FilterSelect from '../FilterSelect/FilterSelect';
import AddItemForm from '../AddItemForm/AddItemForm';
import {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

type PropsType = {
  id: string
  title: string
  tasks: TaskType[]
  deleteTask: (todolistId: string, id: string) => void
  changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
  createTask: (todolistId: string, title: string) => void
  filterTasks: (todolistId: string, value: FilteredTaskType) => void
  filter: FilteredTaskType
  deleteTodolist: (todolistId: string) => void
  changeTaskTitle: (todolist: string, taskId: string, title: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
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
    deleteTodolist,
    changeTaskTitle,
    changeTodolistTitle
  }) => {
  const [editMode, setEditMode] = useState(false);

  const changeTodolistTitleHandler = () => {
    if(!editMode) {
      deleteTodolist(id);
    }

    setEditMode(false);
  }

  return (
    <div className={s.todolist}>
      <div className={s.head}>
        <TodolistTitle todolistId={id}
                       title={title}
                       deleteTodolist={deleteTodolist}
                       changeTodolistTitle={changeTodolistTitle}
                       setEditMode={setEditMode}/>
        <IconButton>
          <DeleteIcon onClick={changeTodolistTitleHandler}/>
        </IconButton>
      </div>
      <AddItemForm todolistId={id} createItem={createTask} minCharter={2} maxCharter={20}/>
      <FilterSelect todolistId={id} filterTasks={filterTasks} filter={filter}/>
      <TasksList
        todolistId={id}
        tasks={tasks}
        deleteTask={deleteTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
      />
      <FilterButtons todolistId={id} filterTasks={filterTasks} filter={filter}/>
    </div>
  );
};

export default Todolist;
