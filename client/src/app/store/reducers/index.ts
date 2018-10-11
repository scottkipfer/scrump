import * as fromTask from './task.reducers';
import * as fromBoard from './board.reducers';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

export interface AppState {
  tasks: fromTask.TaskState;
  board: fromBoard.BoardState;
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: fromTask.reducer,
  board: fromBoard.reducer
};

export const getTaskState = createFeatureSelector<fromTask.TaskState>('tasks');
export const getBoardState = createFeatureSelector<fromBoard.BoardState>('board');
