import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Owner } from '../../models/owner';

@Component({
  selector: 'app-team-cell',
  templateUrl: './team-cell.component.html',
  styleUrls: ['./team-cell.component.css']
})
export class TeamCellComponent implements OnInit {
  @Input() owner: Owner;
  @Output() ownerChange = new EventEmitter();
  @ViewChild('nameInput') nameInput: ElementRef;

  isEditing: boolean;
  icon: string;
  icons: any = {
    na: 'fa fa-ban',
    ns: 'far fa-clock',
    wip: 'fas fa-laptop-code',
    complete: 'fa fa-check-circle'
  }

  constructor() { }

  ngOnInit() {
    if (!this.owner) {
      this.owner = new Owner('', 'ns');
    }
    this.getStatusIcon();
  }

  getStatusIcon() {
    this.icon = this.icons[this.owner.status] || 'fa-ban';
    return this.icon;
  }

  setStatus(status) {
    this.owner.status = status;
    this.getStatusIcon();
    this.ownerChange.emit(this.owner);
  }

  edit() {
    this.isEditing = true;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.nameInput.nativeElement.focus();
    },0); 
  }

  finishEdit() {
    if (this.isEditing) {
      if (this.owner.owner.toLowerCase() === 'x') {
        this.owner.status = 'na';
      } else if (this.owner.status === 'na') {
        this.owner.status = 'ns';
      }
      this.getStatusIcon();
      this.ownerChange.emit(this.owner);
      this.isEditing = false;
    }
  }
}
