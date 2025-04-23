import {RootState} from '../app/store';
import {Todolist} from '../App';

export const selectTodolists = (state: RootState): Todolist[] => state.todolists
