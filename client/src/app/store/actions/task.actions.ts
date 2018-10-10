import { Action } from '@ngrx/store';
import { type } from '../../lib/utils';
import { Task } from '../../models';

export const CREATE_TASK = type('[Task] Create Task');
export const CREATE_TASK_ERROR = type('[Task] Create Task Error');
export const CREATE_TASK_SUCCESS = type('[Task] Create Task Success');

export class CreateTask implements Action {
  public type: string = CREATE_TASK;
  constructor(public payload: Task) {}
}

export class CreateTaskError implements Action {
  public type: string = CREATE_TASK_ERROR;
  constructor(public payload: any) {}
}

export class CreateTaskSuccess implements Action {
  public type: string = CREATE_TASK_SUCCESS;
  constructor(public payload: Task) {}
}

export type TaskActions =
  | CreateTask
  | CreateTaskError
  | CreateTaskSuccess;
