import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

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

  constructor(private store$: Store<fromStore.AppState>) { }

  ngOnInit() {
  }

  edit() {
    this.isEditing = true;
    this.store$.dispatch(new fromStore.StartEdit(null));
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.summaryInput.nativeElement.focus();
    },0); 
  }

  finishEdit() {
    if (this.isEditing) {
    this.store$.dispatch(new fromStore.FinishEdit(null));
      this.valueChange.emit(this.value);
      this.isEditing = false;
    }
  }

}
