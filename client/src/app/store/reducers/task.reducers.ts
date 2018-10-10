import { Task } from '../../models';
import * as taskActions from '../actions/task.actions';

export interface TaskState {
  loaded: boolean;
  loading: boolean;
  tasks?: Task[];
  error?: string;
}

const initialState: TaskState = {
  loaded: false,
  loading: false
};

export function reducer (state: TaskState = initialState, action: taskActions.TaskActions): TaskState {
 switch (action.type) {
   case taskActions.CREATE_TASK:
   case taskActions.CREATE_TASK_SUCCESS:
     return state;

   case taskActions.CREATE_TASK_ERROR:
     return {
       ...state,
       error: action.payload.error
     };

   default: return state;

 }
}

export const getTasksError = (state: TaskState) => state.error;

