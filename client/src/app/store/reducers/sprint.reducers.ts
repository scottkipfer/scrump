import { Sprint } from '../../models/sprint';
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

const updateTaskInList = (state, list, payload) => {
  let isTask = task => task._id == payload.task._id;
  let index = state.currentSprint[list].findIndex(isTask);
  if (~index) {
    state.currentSprint[list][index][payload.field] = payload.task[payload.field];
  }
  return state;
}

export function reducer(state: SprintState = initialState, action: sprintActions.SprintActions): SprintState {
  switch(action.type) {
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

    case sprintActions.CHANGE_TASK_STATUS:
    case sprintActions.SPRINT_TASK_POSITION_UPDATED:
    case sprintActions.UPDATE_SPRINT_TASK_POSITION:
    case sprintActions.CREATE_SPRINT_SUCCESS:
    case sprintActions.CREATE_SPRINT:
    default: return state;
  };

}

export const getCurrentSprint = (state: SprintState) => state.currentSprint;
export const getCurrentSprintError = (state: SprintState) => state.error || null;
export const getPastSprints = (state: SprintState) => state.pastSprints;
export const getPastSprintsError = (state: SprintState) => state.error || null;

