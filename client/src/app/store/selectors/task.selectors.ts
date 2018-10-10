import {createSelector} from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromTasks from '../reducers/task.reducers';

export const getTasksError = createSelector(fromApp.getTaskState, fromTasks.getTasksError);
