import { Task } from '../../models';
import * as taskActions from '../actions/task.actions';

export interface TaskState {
  loaded: boolean;
  loading: boolean;
  tasks?: Task[];
  selectedTasks: Task[];
  error?: string;
}

const initialState: TaskState = {
  loaded: false,
  loading: false,
  selectedTasks: []
};

const addTaskToSelection = (state, task) => {
  state.selectedTasks.push(task);
  return state;
}

const removeTaskFromSelection = (state, task) => {
  let isTask = listTask => task._id == listTask._id;
  let index = state.selectedTasks.findIndex(isTask);
  if (index > -1) {
    state.selectedTasks.splice(index, 1);
  }
  return state;
}

export function reducer (state: TaskState = initialState, action: taskActions.TaskActions): TaskState {
  switch (action.type) {
    
    case taskActions.CREATE_TASK_ERROR:
      return {
        ...state,
        error: action.payload.error
      };

    case taskActions.SELECT_TASK:
      state = addTaskToSelection(state, action.payload);
      return state;

    case taskActions.UNSELECT_TASK:
      console.log("payload is: ", action.payload);
      state = removeTaskFromSelection(state, action.payload);
      return state;

    case taskActions.UNSELECT_MULTIPLE_TASKS:
      action.payload.tasks.forEach(task => {
        state = removeTaskFromSelection(state, task);
      })
      return state;

    case taskActions.SWITCH_BOARDS_SUCCESS:
    case taskActions.UNSELECT_ALL_TASKS:
      return {
        ...state,
        selectedTasks: []
      }

    case taskActions.CREATE_TASK:
    case taskActions.CREATE_TASK_SUCCESS:
    case taskActions.TASK_UPDATED:
    default: return state;
  }
}

export const getTasksError = (state: TaskState) => state.error;
export const getTasks = (state: TaskState) => state.tasks;
export const getSelectedTasks = (state: TaskState) => state.selectedTasks;
export const getTasksLoading = (state: TaskState) => state.loading;
export const getTasksLoaded = (state: TaskState) => state.loaded;
