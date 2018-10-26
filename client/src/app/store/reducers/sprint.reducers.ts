import { Sprint, Task } from '../../models';
import * as sprintActions from '../actions/sprint.actions';
import { StartEdit } from '../actions';

export interface SprintState {
  loaded: boolean;
  loading: boolean;
  pastSprints?: Sprint[];
  currentSprint?: Sprint;
  error?: any;
}

const initialState: SprintState = {
  loaded: false,
  loading: false
};

const updateTaskInList = (state: SprintState, list: string, payload: any) => {
  let isTask = task => task._id == payload.task._id;
  let index = state.currentSprint[list].findIndex(isTask);
  if (~index) {
    state.currentSprint[list][index][payload.field] = payload.task[payload.field];
  }
  return state;
}

const updateTaskPositionInList = (state: SprintState, payload: { list: string, fromIndex: number, toIndex: number }) => {
  let popped = state.currentSprint[payload.list].splice(payload.fromIndex, 1)[0];
  state.currentSprint[payload.list].splice(payload.toIndex, 0, popped);
  return state;
}

const updateTaskStatus = (state: SprintState, payload: { taskId: string, fromStatus: string, toStatus: string }) => {
  let taskIndex = state.currentSprint[payload.fromStatus].findIndex((task) => task._id == payload.taskId);
  if (taskIndex > -1) {
    let popped = state.currentSprint[payload.fromStatus].splice(taskIndex, 1)[0];
    state.currentSprint[payload.toStatus].push(popped);
  }
  return state;
}

const addTask = (state: SprintState, newTask: Task) => {
  let isTask = task => task._id == newTask._id;
  let index = state.currentSprint['notStarted'].findIndex(isTask);
  if (index === -1) {
    state.currentSprint.notStarted.push(newTask);
  }
  return state;
}

const removeTask = (state: SprintState, list: string, taskId: string) => {
  let isTask = task => task._id == taskId;
  let index = state.currentSprint[list].findIndex(isTask);
  if (index > -1) {
    state.currentSprint[list].splice(index, 1);
  }
  return state;
}

export function reducer(state: SprintState = initialState, action: sprintActions.SprintActions): SprintState {
  switch (action.type) {
    case sprintActions.CREATE_SPRINT_ERROR:
      return {
        ...state,
        error: action.payload.error
      }

    case sprintActions.LOAD_PAST_SPRINTS:
    case sprintActions.LOAD_CURRENT_SPRINT:
      return {
        ...state,
        loaded: false,
        loading: true
      }

    case sprintActions.LOAD_PAST_SPRINTS_ERROR:
    case sprintActions.LOAD_CURRENT_SPRINT_ERROR:
      return {
        ...state,
        error: action.payload.error
      }

    case sprintActions.SPRINT_CREATED:
    case sprintActions.LOAD_CURRENT_SPRINT_SUCCESS:
    return {
      ...state,
      loaded: true,
      loading: false,
      currentSprint: action.payload,
      error: null
    }
    
    case sprintActions.LOAD_PAST_SPRINTS_SUCCESS:
    return {
      ...state,
      loaded: true,
      loading: false,
      pastSprints: action.payload,
      error: null
    }
    case sprintActions.UPDATE_TASK_IN_SPRINT:
      state = updateTaskInList(state, 'notStarted', action.payload);
      state = updateTaskInList(state, 'inProgress', action.payload);
      state = updateTaskInList(state, 'onHold', action.payload);
      state = updateTaskInList(state, 'completed', action.payload);
      state = updateTaskInList(state, 'cancelled', action.payload);
      return state;

    case sprintActions.SPRINT_TASK_POSITION_UPDATED:
      state = updateTaskPositionInList(state, action.payload);
      return state;

    case sprintActions.TASK_STATUS_CHANGED:
      state = updateTaskStatus(state, action.payload);
      return state;

    case sprintActions.TASK_ADDED_TO_SPRINT:
      if (state.currentSprint) {
      state = addTask(state, action.payload.task);
      }
      return state;

    case sprintActions.TASK_REMOVED_FROM_SPRINT:
      if (state.currentSprint) {
      state = removeTask(state, 'notStarted', action.payload.taskId);
      state = removeTask(state, 'inProgress', action.payload.taskId);
      state = removeTask(state, 'onHold', action.payload.taskId);
      state = removeTask(state, 'completed', action.payload.taskId);
      state = removeTask(state, 'cancelled', action.payload.taskId);
      }
      return state;

    case sprintActions.UPDATE_SPRINT_TASK_POSITION:  
    case sprintActions.CHANGE_TASK_STATUS:
    case sprintActions.CREATE_SPRINT_SUCCESS:
    case sprintActions.CREATE_SPRINT:
    default: return state;
  };

}

export const getCurrentSprint = (state: SprintState) => state.currentSprint;
export const getCurrentSprintError = (state: SprintState) => state.error || null;
export const getPastSprints = (state: SprintState) => state.pastSprints;
export const getPastSprintsError = (state: SprintState) => state.error || null;

