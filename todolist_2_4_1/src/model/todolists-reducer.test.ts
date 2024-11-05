import {v1} from 'uuid';
import {TodolistType} from '../App';
import {todolistsReducer} from './todolists-reducer';

test('remove todolist to be correct', () => {
  // data
  let todolistID1 = v1();
  let todolistID2 = v1();

  const startData: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ];

  // action
  const action = {
    type: 'ADD-TODOLIST',
    payload: {
      id: todolistID1
    }
  }

  const endState = todolistsReducer(startData, action);

  // expect
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistID2);
});
