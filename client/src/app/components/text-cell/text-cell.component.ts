import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Task } from '../../models/task'

@Component({
  selector: 'app-text-cell',
  templateUrl: './text-cell.component.html',
  styleUrls: ['./text-cell.component.css']
})
export class TextCellComponent implements OnInit {
  @Input() value: string;
  @Output() valueChange = new EventEmitter();
  @ViewChild('summaryInput') summaryInput: ElementRef;

  isEditing: boolean;

  constructor() { }

  ngOnInit() {
  }

  edit() {
    this.isEditing = true;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.summaryInput.nativeElement.focus();
    },0); 
  }

  finishEdit() {
    if (this.isEditing) {
      this.valueChange.emit(this.value);
      this.isEditing = false;
    }
  }

}
