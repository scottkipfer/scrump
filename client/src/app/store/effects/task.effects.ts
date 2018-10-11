import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Effect, Actions} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, tap, switchMap, catchError, withLatestFrom} from 'rxjs/operators';
import {TaskService} from '../../services/task/task.service';
import * as taskActions from '../actions/task.actions';
import * as boardActions from '../actions/board.actions';
import {Task, CreateTaskModel, Board} from '../../models';
import {AppState} from '../../store/reducers';
import {getBoard} from '../../store/selectors/board.selectors';
import {Store} from '@ngrx/store';

@Injectable()
export class TaskEffects {
  @Effect()
  createTask$ = this.actions$
    .ofType(taskActions.CREATE_TASK).pipe(
      map((action: taskActions.CreateTask) => action.payload),
      switchMap((task: CreateTaskModel) => {
        return this.taskService.createTask(task).pipe(
          map(task => new taskActions.CreateTaskSuccess(task)),
          catchError(error => of(new taskActions.CreateTaskError({error: error})))
        );
      })
    );

  @Effect()
  createTaskSuccess$ = this.actions$
    .ofType(taskActions.CREATE_TASK_SUCCESS).pipe(
      withLatestFrom(this.store$.select(getBoard)),
      map(([action, board]) => new boardActions.LoadBoard(board.name))
    );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private router: Router,
    private store$: Store<AppState>
  ) {}
}
