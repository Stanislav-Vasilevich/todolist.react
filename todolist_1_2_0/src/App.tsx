import './App.css';
import {useState} from 'react';
import Todolist from './components/Todolist';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export type FilteredTaskType = 'all' | 'active' | 'completed';

function App() {
  const todolistTitle = 'What to learn?';

  const [tasks, setTasks] = useState([
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'React', isDone: false}
  ]);

  const [filter, setFilter] = useState<FilteredTaskType>('all');

  const deleteTask = (taskId: number) => {
    const newTasks = tasks.filter(t => t.id !== taskId);

    setTasks(newTasks);
  }

  const changeTaskStatus = (taskId: number, isDone: boolean) => {
    const newTask = tasks.map(t => t.id === taskId ? {...t, isDone} : t);

    setTasks(newTask);
  }

  const filterTasks = (value: FilteredTaskType) => {
    setFilter(value);
  }

  const filteredTasks = (tasks, filter) => {
    let filteredTasks: TaskType[] = tasks;

    if(filter === 'active') {
      filteredTasks = tasks.filter(t => !t.isDone);
    }

    if(filter === 'completed') {
      filteredTasks = tasks.filter(t => t.isDone);
    }

    return filteredTasks;
  }

  return (
    <div className="app">
      <Todolist title={todolistTitle}
                tasks={filteredTasks(tasks, filter)}
                deleteTask={deleteTask}
                changeTaskStatus={changeTaskStatus}
                filterTasks={filterTasks}
                filter={filter}
      />
    </div>
  )
}

export default App;
