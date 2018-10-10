import { Task } from '../../models';
import * as taskActions from '../actions/task.actions';

export interface TaskState {
  loaded: boolean;
  loading: boolean;
  tasks?: Task[];
  error?: string;
  board?: string;
}

const initialState: TaskState = {
  loaded: false,
  loading: false
};

export function reducer (state: TaskState = initialState, action: taskActions.TaskActions): TaskState {
 switch (action.type) {

   case taskActions.GET_TASKS_BY_BOARD:
     return {
       ...state,
       board: action.payload
     };

   case taskActions.GET_TASKS_BY_BOARD_SUCCESS:
     return {
       ...state,
       tasks: action.payload
     };

   case taskActions.GET_TASKS_BY_BOARD_ERROR:
   case taskActions.CREATE_TASK_ERROR:
     return {
       ...state,
       error: action.payload.error
     };

   case taskActions.CREATE_TASK:
   case taskActions.CREATE_TASK_SUCCESS:
   default: return state;
 }
}

export const getTasksError = (state: TaskState) => state.error;
export const getTasks = (state: TaskState) => state.tasks;
export const getBoard = (state: TaskState) => state.board;
export const getTasksLoading = (state: TaskState) => state.loading;
export const getTasksLoaded = (state: TaskState) => state.loaded;
