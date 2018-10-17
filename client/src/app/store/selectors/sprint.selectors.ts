import { createSelector} from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromSprint from '../reducers/sprint.reducers';

export const getCurrentSprint = createSelector(fromApp.getSprintState, fromSprint.getCurrentSprint);
export const getCurrentSprintError = createSelector(fromApp.getSprintState, fromSprint.getCurrentSprintError);