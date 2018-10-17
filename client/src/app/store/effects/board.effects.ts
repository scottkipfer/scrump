import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Effect, Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store'
import {of, Observable} from 'rxjs';
import {map, switchMap, catchError, tap, withLatestFrom} from 'rxjs/operators';
import {BoardService} from '../../services/board/board.service';
import * as boardActions from '../actions/board.actions';
import * as fromStore from '../../store'
import {getBoard} from '../../store/selectors/board.selectors';
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
          map((board: Board) => new boardActions.CreateBoardSuccess(board)),
          catchError(error => of(new boardActions.CreateBoardError({error: error})))
        )
      })
    );

    @Effect()
    taskRemovedFromBoard$ = this.socketService.taskRemovedFromBoard$.pipe(
      switchMap(task => of(new boardActions.TaskRemovedFromBoard(task)).pipe(
        withLatestFrom(this.store$.select(getBoard)),
        map(([action, board]) => new boardActions.LoadBoard(board.name)))
      )
    )

    @Effect()
    taskAddedToBoard$ = this.socketService.taskAddedToBoard$.pipe(
      switchMap(task => of(new boardActions.TaskAddedToBoard(task)).pipe(
        withLatestFrom(this.store$.select(getBoard)),
        map(([action, board]) => {
          return board ?
          new boardActions.LoadBoard(board.name) :
          new boardActions.LoadBoardError({error: 'No board yet'})
        }))
      )
    )

   @Effect()
   updateTaskPostion$ = this.actions$
     .ofType(boardActions.UPDATE_TASK_POSITION).pipe(
       map((action: boardActions.UpdateTaskPosition) => action.payload),
       withLatestFrom(this.store$.select(getBoard)),
       switchMap(([action, board]) => {
         return this.boardService.updateTaskPosition(action.fromIndex, action.toIndex, board).pipe(
           map((board: Board) => new boardActions.UpdateTaskPositionSuccess(board)),
           catchError(error => of(new boardActions.UpdateTaskPositionError({ error: error })))
         );
       })
     );

    @Effect()
    taskPositionUpdated$ = this.socketService.taskPositionUpdated$.pipe(
      switchMap(task => of(new boardActions.TaskPositionUpdated(task)).pipe(
        withLatestFrom(this.store$.select(getBoard)),
        map(([action, board]) => new boardActions.LoadBoard(board.name)))
      )
    )

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private socketService: SocketService,
    private store$: Store<fromStore.AppState> 
  ) {}
}
