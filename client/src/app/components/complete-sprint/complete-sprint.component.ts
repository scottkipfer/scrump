import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-complete-sprint',
  templateUrl: './complete-sprint.component.html',
  styleUrls: ['./complete-sprint.component.css']
})
export class CompleteSprintComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    private store$: Store<fromStore.AppState>
  ) { }

  ngOnInit() {
  }

  completeSprint() {
    this.store$.dispatch(new fromStore.CompleteSprint(null));
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.close();
  }

}
