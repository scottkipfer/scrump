import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store} from '@ngrx/store';
import { tap, take } from 'rxjs/operators'
import * as fromStore from '../../store';
import {CreateTaskModel} from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  task: CreateTaskModel = new CreateTaskModel();
  currentView$: Observable<string>;
  defaultLocation: string;


  initTask() {
    this.task.task.summary = '';
    this.task.task.requirementUrl = null;
    this.task.board = null;
  }

  ngOnInit() {
    this.initTask();
    this.store.select(fromStore.getCurrentView).pipe(
      take(1),
      tap(view => {
        switch (view) {
          case 'current':
            this.task.board = 'sprint'
            break;
          default: this.task.board = view;
        }
      })
    ).subscribe();
  }

  onClose() {
    this.activeModal.close()
  }

  onSubmit() {
    this.store.dispatch(new fromStore.CreateTask(this.task));
    this.activeModal.close();
  }

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<fromStore.AppState>) {
  }
}
