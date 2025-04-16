import {TasksType} from '../App';
import {createTodolistAC} from './todolists-reducer';
import {v1} from 'uuid';

type ActionsType =
  ReturnType<typeof deleteTasksFromTodolistAC>
  | ReturnType<typeof createTodolistAC>
  | ReturnType<typeof deleteTaskAC>
  | ReturnType<typeof createTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>;

const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
    case 'create_todolist':
      return {...state, [action.payload.id]: []};
    case 'delete_todolist':
      const copyState = {...state};
      delete copyState[action.payload.id];
      return copyState;
    case 'delete_task': {
      const todolistId = action.payload.todolistId;
      const newTasks = state[todolistId].filter(t => t.id !== action.payload.taskId);

      return {...state, [todolistId]: newTasks};
    }
    case 'create_task': {
      const todolistId = action.payload.todolistId;
      const title = action.payload.title;

      return {
        ...state,
        [todolistId]: [...state[todolistId], {id: v1(), title, isDone: false}]
      }
    }
    case 'change_task_status': {
      const todolistId = action.payload.todolistId;
      const taskId = action.payload.taskId;
      const isDone = action.payload.isDone;

      return {...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)};
    }
    case 'change_task_title': {
      const todolistId = action.payload.todolistId;
      const taskId = action.payload.taskId;
      const title = action.payload.title;

      return {
        ...state,
        [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, title} : t)
      }
    }
    default:
      return state;
  }
}

export const deleteTasksFromTodolistAC = (todolistId: string) => ({type: 'delete_todolist', payload: {todolistId}} as const);

export const deleteTaskAC = ({todolistId, taskId}: { todolistId: string, taskId: string }) => ({
  type: 'delete_task', payload: {todolistId, taskId}} as const);

export const createTaskAC = ({todolistId, title}: {todolistId: string, title: string}) => ({
type: 'create_task', payload: {todolistId, title}} as const);

export const changeTaskStatusAC = ({ todolistId, taskId, isDone }: { todolistId: string, taskId: string, isDone: boolean }) => ({type: 'change_task_status', payload: {todolistId, taskId, isDone}} as const);

export const changeTaskTitleAC = ({todolistId, taskId, title}: {todolistId: string, taskId: string, title: string}) => ({type: 'change_task_title', payload: {todolistId, taskId, title}} as const);
