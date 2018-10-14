import { Action } from '@ngrx/store';
import { type } from '../../lib/utils';
import { Board } from '../../models';

export const CREATE_BOARD = type('[Board] Create Board');
export const CREATE_BOARD_ERROR = type('[Board] Create Board Failed');
export const CREATE_BOARD_SUCCESS = type('[Board] Create Board Succeeded');

export const LOAD_BOARD = type('[Board] Load Board');
export const LOAD_BOARD_ERROR = type('[Board] Load Board Failed');
export const LOAD_BOARD_SUCCESS = type('[Board] Load Board Succeeded');

export const ADD_TASK_TO_BOARD = type('[Board] Add Task To Baord');
export const ADD_TASK_TO_BOARD_ERROR = type('[Board] Failed To Add Task To Baord');
export const ADD_TASK_TO_BOARD_SUCCESS = type('[Board] Successfully Added Task To Baord');
export const TASK_ADDED_TO_BOARD = type('[Board] Task Added To Board');

export const REMOVE_TASK_FROM_BOARD = type('[Board] Remove Task From Baord');
export const REMOVE_TASK_FROM_BOARD_ERROR = type('[Board] Faied To Remove Task From Baord');
export const REMOVE_TASK_FROM_BOARD_SUCCESS = type('[Board] Successfully Removed Task From Baord');
export const TASK_REMOVED_FROM_BOARD = type('[Board] Task Removed From Board');


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

export class RemoveTaskFromBoard implements Action {
  public type: string = REMOVE_TASK_FROM_BOARD;
  constructor(public payload: any) {}
}

export class RemoveTaskFromBoardError implements Action {
  public type: string = REMOVE_TASK_FROM_BOARD_ERROR;
  constructor(public payload: any) {}
}

export class RemoveTaskFromBoardSuccess implements Action {
  public type: string = REMOVE_TASK_FROM_BOARD_SUCCESS;
  constructor(public payload: any) {}
}

export class TaskRemovedFromBoard implements Action {
  public type: string = TASK_REMOVED_FROM_BOARD;
  constructor(public payload: any) {}
}

export class AddTaskToBoard implements Action {
  public type: string = ADD_TASK_TO_BOARD;
  constructor(public payload: any) {}
}

export class AddTaskToBoardError implements Action {
  public type: string = ADD_TASK_TO_BOARD_ERROR;
  constructor(public payload: any) {}
}

export class AddTaskToBoardSuccess implements Action {
  public type: string = ADD_TASK_TO_BOARD_SUCCESS;
  constructor(public payload: any) {}
}

export class TaskAddedToBoard implements Action {
  public type: string = TASK_ADDED_TO_BOARD;
  constructor(public payload: any) {}
}

export type BoardActions =
  | CreateBoard
  | CreateBoardError
  | CreateBoardSuccess
  | LoadBoard
  | LoadBoardError
  | LoadBoardSuccess
  | TaskAddedToBoard
  | AddTaskToBoard
  | AddTaskToBoardError
  | AddTaskToBoardSuccess
  | TaskRemovedFromBoard
  | RemoveTaskFromBoard
  | RemoveTaskFromBoardError
  | RemoveTaskFromBoardSuccess;

