import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../../models/task'

@Component({
  selector: 'app-text-cell',
  templateUrl: './text-cell.component.html',
  styleUrls: ['./text-cell.component.css']
})
export class TextCellComponent implements OnInit {
  @Input() value: string;
  @Output() valueChange = new EventEmitter();

  isEditing: boolean;

  constructor() { }

  ngOnInit() {
  }

  edit() {
    this.isEditing = true;
  }

  finishEdit() {
    if (this.isEditing) {
      this.valueChange.emit(this.value);
      this.isEditing = false;
    }
  }

}
