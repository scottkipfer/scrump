import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models';
import * as fromStore from '../../store';
import {Store} from '@ngrx/store';
import { TaskService } from '../../services/task/task.service';
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
  @Input() tasks: Observable<Task[]>;
  private currentBoard$: Observable<string>;

  public boardTasks$: Observable<Task[]>;
  draggingIndex: number;
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
    }));
  }

  allowDrop(event, index) {
    event.preventDefault();
    this.draggingHoverIndex = index;
    this.draggingDirection = this.draggingIndex > index ? 'down' : 'up';
  }

  drag(index) {
    this.draggingIndex = index;
  }

  drop(event, index) {
    event.preventDefault();
    this.store.dispatch(new fromStore.UpdateTaskPosition({
      fromIndex: this.draggingIndex, 
      toIndex: index
    }));

  }

  dragend() {
    this.draggingDirection = null;
    this.draggingHoverIndex = -1;
    this.draggingIndex = -1;
  }

  constructor(
    private taskService: TaskService,
    private store: Store<fromStore.AppState>) {}
}
