import {test, expect} from 'vitest';
import {TasksType, TodolistType} from '../App';
import {addTodolistAC, todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

test('ids should be equals', () => {
  // data
  const startTasksState: TasksType = {};
  const startTodolistsState: TodolistType[] = [];

  // action
  const action = addTodolistAC('new todolist');
  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolist = endTodolistState[0].id;

  // expect
  expect(idFromTasks).toBe(action.payload.id);
  expect(idFromTodolist).toBe(action.payload.id);
});
