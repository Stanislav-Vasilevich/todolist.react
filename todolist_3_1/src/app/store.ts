import {tasksReducer} from '../model/tasks-reducer.ts';
import {todolistsReducer} from '../model/todolists-reducer.ts';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
