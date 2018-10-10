import * as fromTask from './task.reducers';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

export interface AppState {
  tasks: fromTask.TaskState;
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: fromTask.reducer,
};

export const getTaskState = createFeatureSelector<fromTask.TaskState>('tasks');
