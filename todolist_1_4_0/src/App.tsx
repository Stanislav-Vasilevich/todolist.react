import './App.css';
import {useState} from 'react';
import Todolist from './components/Todolist/Todolist';
import {v1} from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilteredTaskType = 'all' | 'active' | 'completed';

function App() {
  const todolistTitle = 'What to learn?';

  const [tasks, setTasks] = useState<TaskType[]>([
    {id: v1(), title: 'HTML', isDone: true},
    {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'JavaScript', isDone: true},
    {id: v1(), title: 'React', isDone: false},
    {id: v1(), title: 'Redux', isDone: false},
    {id: v1(), title: 'PHP', isDone: false},
  ]);

  const [filter, setFilter] = useState<FilteredTaskType>('all');

  const deleteTask = (taskId: string) => {
    const newTasks:TaskType[] = tasks.filter(t => t.id !== taskId);

    setTasks(newTasks);
  }

  const createTask = (title: string) => {
    const newTask: TaskType = {id: v1(), title, isDone: false};

    setTasks([newTask, ...tasks]);
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const newTasks:TaskType[] = tasks.map(t => t.id === taskId ? {...t, isDone} : t);

    setTasks(newTasks);
  }

  const filterTasks = (value: FilteredTaskType) => {
    setFilter(value);
  }

  const filteredTasks = (tasks, filter) => {
    let filteredTasks: TaskType[] = tasks;

    if (filter === 'active') {
      filteredTasks = tasks.filter(t => !t.isDone);
    }

    if (filter === 'completed') {
      filteredTasks = tasks.filter(t => t.isDone);
    }

    return filteredTasks;
  }

  return (
    <div className="app">
      <Todolist
        title={todolistTitle}
        tasks={filteredTasks(tasks, filter)}
        deleteTask={deleteTask}
        changeTaskStatus={changeTaskStatus}
        createTask={createTask}
        filterTasks={filterTasks}
        filter={filter}
      />
    </div>
  )
}

export default App;
