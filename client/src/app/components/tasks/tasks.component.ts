import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models';
import * as fromStore from '../../store';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take, map} from 'rxjs/operators';
import { getBoard } from '../../store';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() tasksHeader: string;
  @Input() statusFilter: string;
  @Input() type: string = 'board'; // sprint | board
  @Input() listName: string; // inProgress | notStarted | ...etc
  @Input() tasks: Observable<Task[]>;
  private currentBoard$: Observable<string>;

  public boardTasks$: Observable<Task[]>;
  draggingIndex: number = -1;
  draggingHoverIndex: number;
  draggingDirection: string;

  ngOnInit() {
  }

  saveChanges(task) {
    this.store.dispatch(new fromStore.UpdateTask(task));
  }

  changeBoard(task, newBoard) {
    this.store.dispatch(new fromStore.SwitchBoards({
      taskId: task._id,
      newBoard: newBoard,
      type: this.type
    }));
  }

  changeTaskStatus(task, event) {
    let action = event;
    action.taskId = task._id;
    this.store.dispatch(new fromStore.ChangeTaskStatus(action));
  }

  allowDrop(event, index) {
    event.preventDefault();
    if (this.draggingIndex === -1) {
      return false;
    }
    this.draggingHoverIndex = index;
    this.draggingDirection = this.draggingIndex > index ? 'down' : 'up';
  }

  drag(index) {
    this.draggingIndex = index;
  }

  drop(event, index) {
    event.preventDefault();
    if (this.type === 'sprint') {
      this.store.dispatch(new fromStore.UpdateSprintTaskPosition({
        list: this.listName,
        fromIndex: this.draggingIndex, 
        toIndex: index
      }));  
    } else {
      this.store.dispatch(new fromStore.UpdateTaskPosition({
        fromIndex: this.draggingIndex, 
        toIndex: index
      }));  
    }
  }

  dragend() {
    this.draggingDirection = null;
    this.draggingHoverIndex = -1;
    this.draggingIndex = -1;
  }

  constructor(
    private store: Store<fromStore.AppState>) {}
}
