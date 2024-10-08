import {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TasksStateType = {
  [todolistId: string]: TaskType[]
}

export function App() {
  const todolistId_1 = v1();
  const todolistId_2 = v1();

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    {
      id: todolistId_1,
      title: 'What to learn',
      filter: 'all',
    },
    {
      id: todolistId_2,
      title: 'What to bye',
      filter: 'all',
    },
  ]);
  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId_1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS/TS', isDone: false},
      {id: v1(), title: 'REDUX', isDone: true},
    ],
    [todolistId_2]: [
      {id: v1(), title: 'Beer', isDone: true},
      {id: v1(), title: 'Cheeps', isDone: false},
      {id: v1(), title: 'Whiskey', isDone: false},
      {id: v1(), title: 'Cola', isDone: true},
    ]
  });

  const removeTask = (taskId: string, todolistId: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
  }
  const addTask = (title: string, todolistId: string) => {
    const hello = todolists.find(t => t.id === todolistId);
    console.log('hello: ', hello);

    const newTask: TaskType = {
      title: title,
      isDone: false,
      id: v1()
    }

    setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
  }
  const setTaskNewStatus = (taskId: string, newStatus: boolean, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: [...tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newStatus} : t)]
    });
  }
  const changeTodolistFilter = (newFilter: FilterValuesType, todolistId: string) => {
    setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: newFilter} : t));
  }
  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(t => t.id !== todolistId));
    delete tasks[todolistId];
  }

  return (
    <div className="App">
      {
        todolists.map(t => {
          let filterTasks: Array<TaskType> = tasks[t.id];
          if (t.filter === 'active') {
            filterTasks = filterTasks.filter(t => !t.isDone);
          }
          if (t.filter === 'completed') {
            filterTasks = filterTasks.filter(t => t.isDone);
          }

          return (
            <Todolist
              key={t.id}
              todolistId={t.id}
              title={t.title}
              tasks={filterTasks}
              filter={t.filter}
              addTask={addTask}
              removeTask={removeTask}
              changeTodolistFilter={changeTodolistFilter}
              setTaskNewStatus={setTaskNewStatus}
              removeTodolist={removeTodolist}
            />
          )
        })
      }
    </div>
  )
}
