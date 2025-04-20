import {FilteredTaskType, TodolistType} from '../App';
import {v1} from 'uuid';

const initialState: TodolistType[] = [];

type ActionType = ReturnType<typeof deleteTodolistAC>
  | ReturnType<typeof createTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof addTodolistAC>;

export const todolistsReducer = (todolist: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
  switch (action.type) {
    case 'create_todolist':
      return [...todolist, {id: action.payload.id, title: action.payload.title, filter: 'all'}];
    case 'delete_todolist':
      return todolist.filter(t => t.id !== action.payload.id);
    case 'change_todolist_title':
      return todolist.map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t);
    case 'change_todolist_filter':
      return todolist.map(t => t.id === action.payload.id ? {...t, filter: action.payload.filter} : t);
    case 'add_todolist': {
      return [...todolist, {id: action.payload.id, title: action.payload.title, filter: 'all'}]
    }
    default:
      return todolist;
  }
}

export const createTodolistAC = (id: string, title: string) => (
  {type: 'create_todolist', payload: {id, title}} as const);

export const deleteTodolistAC = (id: string) => (
  {type: 'delete_todolist', payload: {id}} as const);

export const changeTodolistTitleAC = ({id, title}: {id: string, title: string}) => (
  {type: 'change_todolist_title', payload: {id, title}} as const);

export const changeTodolistFilterAC = ({id, filter}: {id: string, filter: FilteredTaskType}) => (
  {type: 'change_todolist_filter', payload: {id, filter}} as const);

export const addTodolistAC = (title: string) => {
  return {type: 'add_todolist', payload: {id: v1(), title}} as const;
}
