import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule, NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { TasksComponent } from './tasks/tasks.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextCellComponent } from './text-cell/text-cell.component';
import { TeamCellComponent } from './team-cell/team-cell.component';
import { DateCellComponent } from './date-cell/date-cell.component';
import { LinkCellComponent } from './link-cell/link-cell.component';
import { CurrentTasksComponent } from './current-tasks/current-tasks.component';

import { PropsFilterPipe } from './lib/pipes/props-filter';
import { StatusCellComponent } from './status-cell/status-cell.component';

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
    StatusCellComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    AngularFontAwesomeModule,
    FontAwesomeModule
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
