import type {TasksState} from '../app/App.tsx'
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer.ts';

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask')

export const createTaskAC = createAction<{ todolistId: string, title: string }>('tasks/createTask')

export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')

export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle')

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = []
    })
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
    .addCase(deleteTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(i => i.id === action.payload.taskId)

      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1)
      }
    })
    .addCase(createTaskAC, (state, action) => {
      state[action.payload.todolistId].unshift({id: nanoid(), title: action.payload.title, isDone: false})
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)

      if(task) task.isDone = action.payload.isDone
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
      if (task) task.title = action.payload.title
    })
})
