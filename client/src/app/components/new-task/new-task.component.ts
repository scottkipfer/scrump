import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {CreateTaskModel} from '../../models';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  task: CreateTaskModel = new CreateTaskModel();


  initTask() {
    this.task.task.summary = '';
    this.task.task.requirementUrl = null;
    this.task.board = 'backlog';
  }

  ngOnInit() {
    this.initTask();
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
