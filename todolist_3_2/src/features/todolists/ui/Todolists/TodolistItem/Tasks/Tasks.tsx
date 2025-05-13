import List from '@mui/material/List';
import {Task} from '@/features/todolists/model/tasks-reducer.ts';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectTasks} from '@/features/todolists/model/tasks-selectors.ts';
import {Todolist} from '@/features/todolists/model/todolists-reducer.ts';
import TaskItem from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx';

type Props = {
  todolist: Todolist
}

const Tasks = ({todolist}: Props) => {
  const {id, filter} = todolist

  const tasks = useAppSelector(selectTasks)

  const todolistTasks: Task[] = tasks[id]
  let filteredTasks: Task[] = todolistTasks

  if (filter === 'active') {
    filteredTasks = todolistTasks.filter(task => !task.isDone)
  }

  if (filter === 'completed') {
    filteredTasks = todolistTasks.filter(task => task.isDone)
  }

  return (
    <>
      {filteredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks.map(task => {
            return <TaskItem key={task.id} todolist={todolist} task={task}/>
          })}
        </List>
      )}
    </>
  );
};

export default Tasks;
