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
type TodolistType = {
  id: string
  title: string
  filter: FilteredTaskType
}

type TasksType = {
  [key: string]: Array<TaskType>
}

const todolist_1 = v1();
const todolist_2 = v1();

function App() {
  const [todolist, setTodolist] = useState<Array<TodolistType>>([
    {id: todolist_1, title: 'What to learn', filter: 'all'},
    {id: todolist_2, title: 'What to buy', filter: 'all'},
  ]);

  const [tasks, setTasks] = useState<TasksType>({
    [todolist_1]: [
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'CSS', isDone: true},
      {id: v1(), title: 'JavaScript', isDone: true},
      {id: v1(), title: 'React', isDone: false},
      {id: v1(), title: 'Redux', isDone: false},
      {id: v1(), title: 'PHP', isDone: false},
    ],
    [todolist_2]: [
      {id: v1(), title: 'Water', isDone: true},
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'Meet', isDone: true},
      {id: v1(), title: 'Fish', isDone: false},
    ]
  });

  const filterTasks = (todolistId: string, filter: FilteredTaskType) => {
    setTodolist(todolist.map(t => t.id === todolistId ? {...t, filter} : t));
  }

  const createTask = (todolistId: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]
    });
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    const newTasks = tasks[todolistId].filter(t => t.id !== taskId);

    setTasks({...tasks, [todolistId]: newTasks});
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)});
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolist(todolist.filter(t => t.id !== todolistId));
    delete tasks[todolistId];
    setTasks(tasks);
  }

  return (
    <div className="app">
      {
        todolist.map(t => {
          let filteredTasks: TaskType[] = tasks[t.id];

          if (t.filter === 'active') {
            filteredTasks = tasks[t.id].filter(t => !t.isDone);
          }

          if (t.filter === 'completed') {
            filteredTasks = tasks[t.id].filter(t => t.isDone);
          }

          return (
            <Todolist
              key={t.id}
              id={t.id}
              title={t.title}
              tasks={filteredTasks}
              deleteTask={deleteTask}
              changeTaskStatus={changeTaskStatus}
              createTask={createTask}
              filterTasks={filterTasks}
              filter={t.filter}
              deleteTodolist={deleteTodolist}
            />
          )
        })
      }
    </div>
  )
}

export default App;
