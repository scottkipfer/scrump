import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule }    from '@angular/common/http';

import {NgbModule, NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


import { TasksComponent } from './tasks/tasks.component';

import { TextCellComponent } from './text-cell/text-cell.component';
import { TeamCellComponent } from './team-cell/team-cell.component';
import { DateCellComponent } from './date-cell/date-cell.component';
import { LinkCellComponent } from './link-cell/link-cell.component';
import { CurrentTasksComponent } from './current-tasks/current-tasks.component';

import { PropsFilterPipe } from './lib/pipes/props-filter';
import { StatusCellComponent } from './status-cell/status-cell.component';
import { NewTaskComponent } from './new-task/new-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TextCellComponent,
    TeamCellComponent,
    DateCellComponent,
    LinkCellComponent,
    CurrentTasksComponent,
    PropsFilterPipe,
    StatusCellComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [
    NewTaskComponent
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter},
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
