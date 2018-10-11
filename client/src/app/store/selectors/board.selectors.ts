import { createSelector} from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromBoard from '../reducers/board.reducers';

export const getBoard = createSelector(fromApp.getBoardState, fromBoard.getBoard);
export const getBoardTasks = createSelector(fromApp.getBoardState, fromBoard.getBoardTasks);
export const getBoardError = createSelector(fromApp.getBoardState, fromBoard.getError);
export const getBoardLoaded = createSelector(fromApp.getBoardState, fromBoard.getBoardLoaded);
export const getBoardLoading = createSelector(fromApp.getBoardState, fromBoard.getBoardLoading);
