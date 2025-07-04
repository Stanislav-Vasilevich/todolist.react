import {instance} from '@/common/instance/instance.ts';
import {Todolist} from '@/features/todolists/api/todolistsApi.types.ts';
import {BaseResponse} from '@/common/types';

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>('/todo-lists')
  },
  updateTodolistsTitle({id, title}: {id: string, title: string}) {
    return instance.put<BaseResponse>(`/todo-lists/${id}`, {title})
  }
}
