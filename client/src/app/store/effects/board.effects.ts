import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Effect, Actions} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, switchMap, catchError, tap} from 'rxjs/operators';
import {BoardService} from '../../services/board/board.service';
import * as boardActions from '../actions/board.actions';
import { Board } from '../../models';
import { SocketService } from '../../services/socket/socket.service';

@Injectable()
export class BoardEffects {
  @Effect()
  loadBoard$ = this.actions$
    .ofType(boardActions.LOAD_BOARD).pipe(
      map((action: boardActions.LoadBoard) => action.payload),
      switchMap((boardName: string) => {
        return this.boardService.getBoard(boardName).pipe(
          map((board: Board) => new boardActions.LoadBoardSuccess(board)),
          catchError(error => of(new boardActions.LoadBoardError({error: error})))
        )
      })
    );

  @Effect()
  createBoard$ = this.actions$
    .ofType(boardActions.CREATE_BOARD).pipe(
      map((action:boardActions.CreateBoard) => action.payload),
      switchMap((board: Board) => {
        return this.boardService.createBoard(board).pipe(
          tap((board: Board) => {this.socketService.emit('something')}),
          map((board: Board) => new boardActions.CreateBoardSuccess(board)),
          catchError(error => of(new boardActions.CreateBoardError({error: error})))
        )
      })
    );

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private router: Router,
    private socketService: SocketService
  ) {}
}
