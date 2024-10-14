import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {useState} from 'react';
import {v1} from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
    {id: v1(), title: 'Redux', isDone: false},
    {id: v1(), title: 'Typescript', isDone: false},
    {id: v1(), title: 'RTK query', isDone: false},
  ]);

  const removeTask = (tasksId: number) => {
    setTasks(tasks.filter(t => t.id != tasksId));
  }
  const addTask = (title: string) => {
    const task = {id: v1(), title, isDone: false};

    setTasks([task, ...tasks]);
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasks}
        removeTask={removeTask}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
