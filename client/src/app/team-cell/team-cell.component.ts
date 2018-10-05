import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Owner } from '../owner';

@Component({
  selector: 'app-team-cell',
  templateUrl: './team-cell.component.html',
  styleUrls: ['./team-cell.component.css']
})
export class TeamCellComponent implements OnInit {
  @Input() owner: Owner;
  @Output() ownerChange = new EventEmitter();

  isEditing: boolean;
  icon: string;
  icons: any = {
    na: 'fa-ban',
    ns: 'fa-hourglass',
    wip: 'fa-laptop',
    complete: 'fa-check'
  }

  constructor() { }

  ngOnInit() {
    if (!this.owner) {
      this.owner = new Owner('', '', 'ns');
    }
    this.getStatusIcon();
  }

  getStatusIcon() {
    this.icon = this.icons[this.owner.status] || 'fa-ban';
  }

  setStatus(status) {
    console.log("setting status to ", status);
    this.owner.status = status;
    this.getStatusIcon();
  }

  edit() {
    this.isEditing = true;
  }

  finishEdit() {
    if (this.isEditing) {
      this.ownerChange.emit(this.owner);
      if (this.owner.owner.toLowerCase() === 'x') {
        this.owner.status = 'na';
      } else if (this.owner.status === 'na') {
        this.owner.status = 'ns';
      }
      this.getStatusIcon();
      this.isEditing = false;
    }
  }
}
