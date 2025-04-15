import {FilteredTaskType, TodolistType} from '../App';

const initialState: TodolistType[] = [];

type ActionType = ReturnType<typeof deleteTodolistAC> | ReturnType<typeof createTodolistAC> | ReturnType<typeof changeTodolistTitleAC> | ReturnType<typeof changeTodolistFilterAC>;

export const todolistsReducer = (todolist: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
  switch (action.type) {
    case 'delete_todolist':
      return todolist.filter(t => t.id !== action.payload.id);
    case 'create_todolist':
      return [...todolist, {id: action.payload.id, title: action.payload.title, filter: 'all'}];
    case 'change_todolist_title':
      return todolist.map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t);
    case 'change_todolist_filter':
      return todolist.map(t => t.id === action.payload.id ? {...t, filter: action.payload.filter} : t);
    default:
      return todolist;
  }
}

export const deleteTodolistAC = (id: string) => (
  {type: 'delete_todolist', payload: {id}} as const);

export const createTodolistAC = (id: string, title: string) => (
  {type: 'create_todolist', payload: {id, title}} as const);

export const changeTodolistTitleAC = ({id, title}: {id: string, title: string}) => (
  {type: 'change_todolist_title', payload: {id, title}} as const);

export const changeTodolistFilterAC = ({id, filter}: {id: string, filter: FilteredTaskType}) => (
  {type: 'change_todolist_filter', payload: {id, filter}} as const);
