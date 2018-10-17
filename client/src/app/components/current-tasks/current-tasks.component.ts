import {Observable} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task/task.service';
import {SprintService} from '../../services/sprint/sprint.service';
import {tap} from 'rxjs/operators';
import { Sprint } from '../../models';
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

  constructor(
    private taskService: TaskService,
    private sprintService: SprintService,
    private store: Store<fromStore.AppState>
  ) { }

  ngOnInit() {
    console.log("getting current sprint");
    this.sprintError$ = this.store.select(fromStore.getCurrentSprintError);
    this.sprint$ = this.store.select(fromStore.getCurrentSprint);

    this.store.dispatch(new fromStore.LoadCurrentSprint(null));
  }

  createSprint() {
    this.store.dispatch(new fromStore.CreateSprint({}));
  }
}
