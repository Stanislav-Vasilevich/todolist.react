import {TasksType} from '../App';
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer';

type ActionType = ReturnType<typeof deleteTodolistAC> | ReturnType<typeof createTodolistAC>;

export const tasksReducer = (tasks, TasksType, action: ActionType): TasksType => {
  switch (action) {
    case 'create_todolist':
      return {...tasks, [action.payload.id]: []};
    case 'delete_todolist':
      const copyState = {...tasks};
      delete copyState[action.payload.id];
      return copyState;
    default:
      return tasks;
  }
}
