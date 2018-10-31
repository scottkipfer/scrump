import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NewTaskComponent} from './components/new-task/new-task.component';
import { CompleteSprintComponent } from './components/complete-sprint/complete-sprint.component';
import {Store} from '@ngrx/store';
import * as fromStore from './store';
import {Observable} from 'rxjs'
import {delay, map} from 'rxjs/operators'
import { SocketService } from './services/socket/socket.service';
import { Task } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentView$: Observable<string>;
  title : string = 'ScrumP';
  activeTab : string = 'current';
  connected$: Observable<any>;
  selectedTasks$: Observable<Task[]>;

  constructor (
    private modalService: NgbModal,
    private store: Store<fromStore.AppState>,
    private socketService: SocketService
    ) {}

  ngOnInit() {
    this.currentView$ = this.store.select(fromStore.getCurrentView).pipe(delay(0));
    this.connected$ = this.socketService.connected$;
    this.selectedTasks$ = this.store.select(fromStore.getSelectedTasks);
  }

  openModal() {
    const modalRef = this.modalService.open(NewTaskComponent);
  }

  completeSprint() {
    const completeModalRef = this.modalService.open(CompleteSprintComponent);
  }

  changeBoardForSelected(newBoard) {
    this.store.dispatch(new fromStore.SwitchBoardsBulk({
      newBoard: newBoard
    }));  
  }

}
