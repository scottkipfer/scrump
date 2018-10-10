import {createSelector} from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromTasks from '../reducers/task.reducers';

export const getTasksError = createSelector(fromApp.getTaskState, fromTasks.getTasksError);
export const getTasks = createSelector(fromApp.getTaskState, fromTasks.getTasks);
export const getBoard = createSelector(fromApp.getTaskState, fromTasks.getBoard);
export const getTasksLoaded = createSelector(fromApp.getTaskState, fromTasks.getTasksLoaded);
