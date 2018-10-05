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
    unassigned: 'fa-user-circle',

  }

  constructor() { }

  ngOnInit() {
    if (!this.owner) {
      this.owner = new Owner('', '', 'unassigned');
    }
    this.getStatusIcon();
    console.log("icon is: ", this.icon);
  }

  getStatusIcon() {
    console.log("status is: ", this.owner);
    this.icon = this.icons[this.owner.status] || 'fa-github';
  }

  edit() {
    this.isEditing = true;
  }

  finishEdit() {
    if (this.isEditing) {
      this.ownerChange.emit(this.owner);
      this.isEditing = false;
    }
  }

}
