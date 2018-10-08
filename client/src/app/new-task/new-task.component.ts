import { Component, OnInit } from '@angular/core';

import { Task } from '../task';

declare var $: any;

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  task: Task;

  constructor() {
  }

  initTask() {
    console.log("initting the new task", this.task);
    // if (!this.task) {
      this.task = null;
      this.task = new Task();      
    // }
    this.task.summary = 'i love bananas';
    this.task.requirementUrl = null;
    this.task.board = 'Backlog';

    console.log("initted it to", this.task);
  }

  ngOnInit() {
    console.log("INITTING THIS");
    this.initTask();
    var that = this;
    $('#newTaskModal').on('show.bs.modal', this.initTask);
  }

  onClose() {
    $('#newTaskModal').modal('hide');
    $('#newTaskModal').modal('dispose');
  }

  onSubmit() {
    console.log("about to create task: ", this.task);
    $('#newTaskModal').modal('hide');
    $('#newTaskModal').modal('dispose');
  }
}
