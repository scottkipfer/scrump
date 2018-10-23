import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers'
import * as fromView from '../reducers/view.reducers';

export const getCurrentView = createSelector(fromApp.getViewState, fromView.getCurrentView)
