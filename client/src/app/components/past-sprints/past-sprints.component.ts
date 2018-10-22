import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {tap, map} from 'rxjs/operators';
import { Sprint, Task } from '../../models';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-past-sprints',
  templateUrl: './past-sprints.component.html',
  styleUrls: ['./past-sprints.component.css']
})
export class PastSprintsComponent implements OnInit {
  public sprints$: Observable<Sprint[]>;
  public sprintError$: Observable<any>;

  constructor(private store: Store<fromStore.AppState>) { }

  ngOnInit() {
    this.sprintError$ = this.store.select(fromStore.getPastSprintsError);
    this.sprints$ = this.store.select(fromStore.getPastSprints);

    this.store.dispatch(new fromStore.LoadPastSprints(null));
  }

}
