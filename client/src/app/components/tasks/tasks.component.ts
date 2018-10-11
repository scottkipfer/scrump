import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models';
import * as fromStore from '../../store';
import {Store} from '@ngrx/store';
import { TaskService } from '../../services/task/task.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() tasksHeader: string;
  @Input() statusFilter: string;
  @Input() tasks: Observable<Task[]>;

  public boardTasks$: Observable<Task[]>;
  draggingIndex: number;
  draggingHoverIndex: number;
  draggingDirection: string;

  ngOnInit() {
  }

  saveChanges(task) {
    this.taskService.updateTask(task).subscribe();
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
    this.taskService.moveTaskFromTo(this.draggingIndex, index);
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
