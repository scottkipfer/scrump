import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task';
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
  editingSummary: false;
  public boardTasks$: Observable<Task[]>;
  draggingIndex: number;
  draggingHoverIndex: number;
  draggingDirection: string;

  constructor(private taskService: TaskService, private store: Store<fromStore.AppState>) {

  }

  ngOnInit() {
    this.boardTasks$ =this.store.select(fromStore.getTasks);
    //this.getTasks();
  }

  getTasks(): void {
  }

  saveChanges(task) {
    this.taskService.updateTask(task).subscribe();
  }

  /// experimental

  allowDrop(ev, index) {
    ev.preventDefault();
    this.draggingHoverIndex = index;
    this.draggingDirection = this.draggingIndex > index ? 'down' : 'up';
  }

  drag(index) {
    console.log("drag called and event is: ", index);
    this.draggingIndex = index;
    // ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev, index) {
    ev.preventDefault();
    // var data = ev.dataTransfer.getData("text");
    console.log("drop called and event is: ", index);
    this.draggingHoverIndex = -1;
    this.draggingIndex = -1;
    this.taskService.moveTaskFromTo(this.draggingIndex, index);
    // ev.target.appendChild(document.getElementById(data));
  }
}
