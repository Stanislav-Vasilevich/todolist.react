import {TodolistType} from '../App';
import {v1} from 'uuid';

let todolistID1 = v1();
let todolistID2 = v1();

const initialState: TodolistType[] = [
  {id: todolistID1, title: 'What to learn', filter: 'all'},
  {id: todolistID2, title: 'What to buy', filter: 'all'},
];

type ActionType = {
  type: string,
  payload: {
    id: string
  }
}

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionType) => {
  switch (action.type) {
    case 'ADD-TODOLIST': {
      return state.filter(tl => tl.id !== action.payload.id);
    }
    default:
      throw new Error("I don't understand this type")
  }
}
