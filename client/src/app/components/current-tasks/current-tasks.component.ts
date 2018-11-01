import {Observable} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {tap, map} from 'rxjs/operators';
import { Sprint, Task } from '../../models';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
  selector: 'app-current-tasks',
  templateUrl: './current-tasks.component.html',
  styleUrls: ['./current-tasks.component.css']
})
export class CurrentTasksComponent implements OnInit {
  public sprint$: Observable<Sprint>;
  public sprintError$: Observable<any>;
  public notStartedTasks$: Observable<Task[]>
  public techDebtTasks$: Observable<Task[]>
  public inProgressTasks$: Observable<Task[]>
  public onHoldTasks$: Observable<Task[]>
  public completedTasks$: Observable<Task[]>
  public cancelledTasks$: Observable<Task[]>

  constructor(
    private store: Store<fromStore.AppState>
  ) { }

  ngOnInit() {
    this.sprintError$ = this.store.select(fromStore.getCurrentSprintError);
    this.sprint$ = this.store.select(fromStore.getCurrentSprint);
    this.notStartedTasks$ = this.sprint$.pipe(
      map((sprint: Sprint) => sprint? sprint.notStarted : [])
    )
    this.techDebtTasks$ = this.sprint$.pipe(
      map((sprint: Sprint) => sprint? sprint.techDebt : [])
    )
    this.inProgressTasks$ = this.sprint$.pipe(
      map((sprint: Sprint) => sprint? sprint.inProgress : [])
    )
    this.onHoldTasks$ = this.sprint$.pipe(
      map((sprint: Sprint) => sprint? sprint.onHold : [])
    )
    this.completedTasks$ = this.sprint$.pipe(
      map((sprint: Sprint) => sprint? sprint.completed : [])
    )
    this.cancelledTasks$ = this.sprint$.pipe(
      map((sprint: Sprint) => sprint? sprint.cancelled : [])
    )

    this.store.dispatch(new fromStore.LoadCurrentSprint(null));
    this.store.dispatch(new fromStore.UpdateView('current'));
  }

  createSprint() {
    this.store.dispatch(new fromStore.CreateSprint({}));
  }
}
