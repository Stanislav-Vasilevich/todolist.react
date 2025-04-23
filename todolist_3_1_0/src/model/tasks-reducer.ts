import type {TasksState} from '../App'
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer';
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';

const initialState: TasksState = {}

export const createTaskAC = createAction<{ todolistId: string, title: string }>('task/createTask')
export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('task/deleteTask')
export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('task/changeTaskStatus')
export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('task/changeTaskTitle')

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = []
    })
    .addCase(createTaskAC, (state, action) => {
      state[action.payload.todolistId].unshift({title: action.payload.title, isDone: false, id: nanoid()})
    })
    .addCase(deleteTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
      state[action.payload.todolistId].splice(index, 1)
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
      if(task) {
        task.isDone = action.payload.isDone
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
      if(task) {
        task.title = action.payload.title
      }
    })
})
