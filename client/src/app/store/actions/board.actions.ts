import { Action } from '@ngrx/store';
import { type } from '../../lib/utils';
import { Board } from '../../models';

export const CREATE_BOARD = type('[Board] Create Board');
export const CREATE_BOARD_ERROR = type('[Board] Create Board Failed');
export const CREATE_BOARD_SUCCESS = type('[Board] Create Board Succeeded');
export const LOAD_BOARD = type('[Board] Load Board');
export const LOAD_BOARD_ERROR = type('[Board] Load Board Failed');
export const LOAD_BOARD_SUCCESS = type('[Board] Load Board Succeeded');

export class CreateBoard implements Action {
  public type: string = CREATE_BOARD;
  constructor(public payload: Board) {}
}

export class CreateBoardError implements Action {
  public type: string = CREATE_BOARD_ERROR;
  constructor(public payload: any) {}
}

export class CreateBoardSuccess implements Action {
  public type: string = CREATE_BOARD_SUCCESS;
  constructor(public payload: Board) {}
}

export class LoadBoard implements Action {
  public type: string = LOAD_BOARD;
  constructor(public payload: string) {}
}

export class LoadBoardError implements Action {
  public type: string = LOAD_BOARD_ERROR;
  constructor(public payload: any) {}
}

export class LoadBoardSuccess implements Action {
  public type: string = LOAD_BOARD_SUCCESS;
  constructor(public payload: Board) {}
}

export type BoardActions =
  | CreateBoard
  | CreateBoardError
  | CreateBoardSuccess
  | LoadBoard
  | LoadBoardError
  | LoadBoardSuccess;

