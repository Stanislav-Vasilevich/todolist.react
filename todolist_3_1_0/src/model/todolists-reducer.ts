import type {FilterValues, Todolist} from '../App'
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';

export const deleteTodolistAC = createAction<{ id: string }>('todolist/deleteTodolist')
export const changeTodolistTitleAC = createAction<{ id: string, title: string }>('todolist/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{ id: string, filter: FilterValues }>('todolist/changeTodolistFilter')
export const createTodolistAC = createAction('todolist/createTodolist', (title: string) => {
  return {payload: {title, id: nanoid()}}
})

const initialState: Todolist[] = []

export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      const index = state.findIndex(t => t.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    })
    .addCase(createTodolistAC, (state, action) => {
      state.push({...action.payload, filter: 'all'})
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
      const todolist = state.find(t => t.id === action.payload.id)
      if (todolist) {
        todolist.title = action.payload.title
      }
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const index = state.findIndex(t => t.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    })
})
