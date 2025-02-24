import './App.css';
import Todolist from './components/Todolist';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

function App() {
  const todolistTitle_1 = 'What to learn?';
  const todolistTitle_2 = 'What to buy?';
  const todolistTitle_3 = 'What you want?';

  const task_1: Array<TaskType> = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'React', isDone: false}
  ]

  const task_2: Array<TaskType> = [
    {id: 4, title: 'Milk', isDone: true},
    {id: 5, title: 'Meet', isDone: false},
    {id: 6, title: 'Banana', isDone: false},
    {id: 6, title: 'Orange', isDone: true}
  ]

  const task_3: TaskType[] = [];

  return (
    <div className="app">
      <Todolist title={todolistTitle_1} tasks={task_1}/>
      <Todolist title={todolistTitle_2} tasks={task_2}/>
      <Todolist title={todolistTitle_3} tasks={task_3}/>
    </div>
  )
}

export default App;
