import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskService } from '../task.service';
import { Task } from '../task';

declare var $: any;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  task: Task = new Task();

  constructor(public activeModal: NgbActiveModal, private taskService: TaskService) {
  }

  initTask() {
    this.task.summary = '';
    this.task.requirementUrl = null;
    this.task.board = 'backlog';
  }

  ngOnInit() {
    this.initTask();
  }

  onClose() {
    this.activeModal.close()
  }

  onSubmit() {
    console.log(this.task);
    this.taskService.addTask(this.task).subscribe(res => console.log('result is', res)).unsubscribe();
    this.activeModal.close();
  }
}
