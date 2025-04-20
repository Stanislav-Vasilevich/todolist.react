import {beforeEach, expect, test} from 'vitest';
import type {TasksType} from '../App';
import {v1} from 'uuid';
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC,
  tasksReducer
} from './tasks-reducer';
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer';

let startState: TasksType = {};

beforeEach(() => {
  startState = {
    todolistId1: [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false},
    ],
    todolistId2: [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false},
    ],
  }
});

test('array should be created for new todolist', () => {
  // action
  const action = createTodolistAC(v1(), 'New todolist');
  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');

  if (!newKey) {
    throw Error('New key should be added');
  }

  // expect
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {
  // action
  const endState = tasksReducer(startState, deleteTodolistAC('todolistId2'));
  const keys = Object.keys(endState);

  // expect
  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).toBeUndefined();
});
test('correct task should be deleted', () => {
  // action
  const endState = tasksReducer(
    startState,
    deleteTaskAC({todolistId: 'todolistId2', taskId: '2'})
  );

  const copyEndState = endState;

  expect(endState).toEqual({
    todolistId1: [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false},
    ],
    todolistId2: [
      {id: '1', title: 'bread', isDone: false},
      {id: '3', title: 'tea', isDone: false},
    ],
  });

  expect(endState).toBe(copyEndState);
});
test('correct task should be created at correct array', () => {
  const endState = tasksReducer(
    startState,
    createTaskAC({
      todolistId: 'todolistId2',
      title: 'juice',
    })
  );

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(4);
  expect(endState.todolistId2[0].id).toBeDefined();
  expect(endState.todolistId2[0].title).toBe('bread');
  expect(endState.todolistId2[0].isDone).toBe(false);
});
test('correct task should change its status', () => {
  // action
  const endState = tasksReducer(
    startState,
    changeTaskStatusAC({todolistId: 'todolistId2', taskId: '2', isDone: false})
  );

  // expect
  expect(endState['todolistId2'][1].id).toBe('2');
  expect(endState['todolistId2'][1].isDone).toBe(false);
});
test('correct task should change its title', () => {
  // action
  const endState = tasksReducer(startState, changeTaskTitleAC({
    todolistId: 'todolistId2',
    taskId: '3',
    title: 'black tea'
  }));

  // expect
  expect(endState.todolistId2[2].title).toBe('black tea');
});
