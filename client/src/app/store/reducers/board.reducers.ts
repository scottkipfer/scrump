import { Board, Task } from '../../models';
import * as boardActions from '../actions/board.actions';

export interface BoardState {
  loaded: boolean;
  loading: boolean;
  board?: Board;
  error?: any;
}

const initialState: BoardState = {
  loaded: false,
  loading: false
};

const addTask = (state: BoardState, newTask: Task) => {
  let isTask = task => task._id == newTask._id;
  let index = state.board.tasks.findIndex(isTask);
  if (index === -1) {
    state.board.tasks.push(newTask);
  }
  return state;
}

const removeTask = (state: BoardState, taskId: string) => {
  let isTask = task => task._id == taskId;
  let index = state.board.tasks.findIndex(isTask);
  if (index > -1) {
    state.board.tasks.splice(index, 1);
  }
  return state;
}

export function reducer (state: BoardState = initialState, action: boardActions.BoardActions): BoardState {
  switch (action.type) {

    case boardActions.LOAD_BOARD:
      return {
        ...state,
        loading: true,
        loaded: false
      };

    case boardActions.CREATE_BOARD_SUCCESS:
    case boardActions.LOAD_BOARD_SUCCESS:
      console.log("you are in load board success");
      return {
        ...state,
        error: '',
        loading: false,
        loaded: true,
        board: action.payload
      };

    case boardActions.CREATE_BOARD_ERROR:
    case boardActions.LOAD_BOARD_ERROR:
      return {
        ...state,
        error: action.payload.error
      };

    case boardActions.TASK_ADDED_TO_BOARD:
      if (state.board && state.board.name === action.payload.boardName) {
        state = addTask(state, action.payload.task);
      }  
      return state;

    case boardActions.TASKS_ADDED_TO_BOARD:
      if (state.board && state.board.name === action.payload.boardName) {
        action.payload.tasks.forEach(task => state = addTask(state, task));        
      }  
      return state;

    case boardActions.TASK_REMOVED_FROM_BOARD:
      if (state.board && state.board.name === action.payload.boardName) {
        state = removeTask(state, action.payload.taskId);
      }      
      return state;

    case boardActions.TASKS_REMOVED_FROM_BOARD:
      if (state.board && state.board.name === action.payload.boardName) {
        action.payload.tasks.forEach(task => state = removeTask(state, task._id));
      }      
      return state;

    case boardActions.UPDATE_TASK_IN_BOARD:
      let isTask = task => task._id == action.payload.task._id;
      let index = state.board.tasks.findIndex(isTask);
      if (~index) {
        state.board.tasks[index][action.payload.field] = action.payload.task[action.payload.field]
      }
      return state;

    case boardActions.CREATE_BOARD:
    default: return state;
  }
}

export const getBoard = (state: BoardState) => state.board;
export const getBoardTasks = (state: BoardState) => {return (state.board ? state.board.tasks: [])};
export const getError = (state: BoardState) => state.error;
export const getBoardLoaded = (state: BoardState) => state.loaded;
export const getBoardLoading = (state: BoardState) => state.loading;
