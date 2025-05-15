import {instance} from '@/common/instance';
import {DomainTask, GetTasksResponse, UpdateTaskModel} from '@/features/todolists/api/tasksApi.types.ts';
import {BaseResponse} from '@/common/types';

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: {todolistId: string, title: string}) {
    const {todolistId, title} = payload

    return instance.post<BaseResponse<{item: DomainTask}>>(`/todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask({todolistId, taskId}: {todolistId: string, taskId: string}) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTaskTitle(payload: {todolistId: string, taskId: string, title: string}) {
    const {todolistId, taskId, title} = payload

    return instance.put<BaseResponse<{item: DomainTask}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
  },
  changeTaskStatus(payload: {todolistId: string, taskId: string, model: UpdateTaskModel}) {
    const {todolistId, taskId, model} = payload

    return instance.put<BaseResponse<{item: DomainTask}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
}

/*
    const todolists = [
      {id: 'todo1', title: 'JavaScript', filter: 'all'},
      {id: 'todo2', title: 'what', filter: 'active'},
    ]

    const tasks = {
      [todo1]: [
        {id: 'task1', title: 'map', isDone: false},
        {id: 'task2', title: 'filter', isDone: false},
      ],
      [todo2]: [],
    }
*/
