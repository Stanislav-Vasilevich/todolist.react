import {useAppDispatch} from '@/common/hooks/useAppDispatch';
import {createTaskAC} from '@/features/todolists/model/tasks-reducer';
import TodolistTitle from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle';
import FilterButtons from '@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons';
import Tasks from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks';
import {Todolist} from '@/app/App';
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm';

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {
  const {id} = todolist

  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTaskAC({todolistId: id, title}))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <CreateItemForm onCreateItem={createTaskHandler}/>
      <Tasks todolist={todolist}/>
      <FilterButtons todolist={todolist}/>
    </div>
  )
}
