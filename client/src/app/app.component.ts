import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NewTaskComponent} from './components/new-task/new-task.component';
import {Store} from '@ngrx/store';
import * as fromStore from './store';
import {Observable} from 'rxjs'
import {delay} from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentView$: Observable<string>;
  title : string = 'ScrumP';
  activeTab : string = 'current';
  constructor (
    private modalService: NgbModal,
    private  store$: Store<fromStore.AppState>
    ) {}

  ngOnInit() {
    this.currentView$ = this.store$.select(fromStore.getCurrentView).pipe(delay(0));
  }

  openModal() {
    const modalRef = this.modalService.open(NewTaskComponent);
  }

}
