import {RootState} from '../app/store';
import {TasksState} from '../App';

export const selectTasks = (state: RootState): TasksState => state.tasks
