import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NewTaskComponent} from './components/new-task/new-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private modalService: NgbModal) {}
  title : string = 'ScrumP';
  activeTab : string = 'current';

  openModal() {
    const modalRef = this.modalService.open(NewTaskComponent);
  }

  setActive(tabName) {
    this.activeTab = tabName;
  }
}
