import { Board } from '../../models';
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

export function reducer (state: BoardState = initialState, action: boardActions.BoardActions): BoardState {
  switch (action.type) {

    case boardActions.LOAD_BOARD:
      return {
        ...state,
        loading: true,
        loaded: false
      };

    case boardActions.LOAD_BOARD_SUCCESS:
      return {
        ...state,
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

    case boardActions.CREATE_BOARD:
    case boardActions.CREATE_BOARD_SUCCESS:
    default: return state;
  }
}

export const getBoard = (state: BoardState) => state.board;
export const getError = (state: BoardState) => state.error;
export const getBoardLoaded = (state: BoardState) => state.loaded;
export const getBoardLoading = (state: BoardState) => state.loading;
