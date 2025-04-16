import {v1} from 'uuid';
import {FilteredTaskType, TodolistType} from '../App';
import { expect, test, beforeEach } from 'vitest';
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistsReducer
} from './todolists-reducer';

// start data
let title: string
let todolistId1: string
let todolistId2: string
let startState: TodolistType[] = []
let filter: FilteredTaskType

// restart data
beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]
})

test('correct todolist should be deleted', () => {
  // action
  const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1));

  // expect
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be created', () => {
  // data
  title = 'New todolist';

  // action
  const endState = todolistsReducer(startState, createTodolistAC(v1(), title));

  // expect
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(title);
});

test('correct todolist should change its title', () => {
  // data
  title = 'New title';

  // action
  const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId2, title}));

  // expect
  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(title);
});

test('correct todolist should change its filter', () => {
  // data
  filter = 'completed';

  // action
  const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, filter}));

  // expect
  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(filter);
})
