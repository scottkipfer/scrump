import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models';
import * as fromStore from '../../store';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {tap, share, map} from 'rxjs/operators';
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
  @Input() boardName: string;

  public boardTasks$: Observable<Task[]>;
  public selectedTasks$: Observable<Task[]>;

  draggingIndex: number = -1;
  draggingHoverIndex: number;
  draggingDirection: string;

  ngOnInit() {
    this.selectedTasks$ = this.store.select(fromStore.getSelectedTasks);
  }

  saveChanges(task, field, value) {
    task[field] = value;
    this.store.dispatch(new fromStore.UpdateTask({task, field, value}));
  }

  changeBoard(task, newBoard) {
    this.store.dispatch(new fromStore.SwitchBoards({
      task: task,
      newBoard: newBoard,
      type: this.type
    }));
  }

  changeTaskStatus(task, event) {
    let action = event;
    action.taskId = task._id;
    this.store.dispatch(new fromStore.ChangeTaskStatus(action));
  }

  checkTaskSelection(task, event) {
    if (event.target.checked) {
      this.store.dispatch(new fromStore.SelectTask(task));
    } else {
      this.store.dispatch(new fromStore.UnselectTask(task));
    }
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
