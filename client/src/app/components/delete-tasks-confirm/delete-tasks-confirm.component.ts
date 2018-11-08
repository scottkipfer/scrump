import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as fromStore from '../../store';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-delete-tasks-confirm',
  templateUrl: './delete-tasks-confirm.component.html',
  styleUrls: ['./delete-tasks-confirm.component.css']
})
export class DeleteTasksConfirmComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    private store$: Store<fromStore.AppState>
  ) { }

  ngOnInit() {
  }

  cancel() {
    this.activeModal.close();
  }

  deleteTasks() {
    this.store$.dispatch(new fromStore.DeleteTasks(null));
    this.activeModal.close();
  }

}
