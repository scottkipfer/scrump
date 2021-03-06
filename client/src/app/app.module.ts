import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule }    from '@angular/common/http';
import { NgbModule, NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Pipes
import { PropsFilterPipe } from './lib/pipes/props-filter';

// Components
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TextCellComponent } from './components/text-cell/text-cell.component';
import { TeamCellComponent } from './components/team-cell/team-cell.component';
import { DateCellComponent } from './components/date-cell/date-cell.component';
import { LinkCellComponent } from './components/link-cell/link-cell.component';
import { CurrentTasksComponent } from './components/current-tasks/current-tasks.component';
import { StatusCellComponent } from './components/status-cell/status-cell.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { BoardComponent } from './components/board/board.component';
import { BoardCellComponent } from './components/board-cell/board-cell.component';

// Services
import {TaskService} from './services/task/task.service';
import {SprintService} from './services/sprint/sprint.service';
import {SocketService} from './services/socket/socket.service';
import { PastSprintsComponent } from './components/past-sprints/past-sprints.component';
import { TasksRoComponent } from './components/tasks-ro/tasks-ro.component';
import { CompleteSprintComponent } from './components/complete-sprint/complete-sprint.component';
import { SquirrelCellComponent } from './components/squirrel-cell/squirrel-cell.component';
import { DeleteTasksConfirmComponent } from './components/delete-tasks-confirm/delete-tasks-confirm.component'

const appRoutes: Routes = [
  { path: 'current', component: CurrentTasksComponent },
  { path: 'board/:name', component: BoardComponent },
  { path: '', redirectTo: '/current', pathMatch: 'full'},
  { path: 'completed', component: PastSprintsComponent },
];

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
    NewTaskComponent,
    BoardComponent,
    BoardCellComponent,
    PastSprintsComponent,
    TasksRoComponent,
    CompleteSprintComponent,
    SquirrelCellComponent,
    DeleteTasksConfirmComponent
  ],
  imports: [
BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  entryComponents: [
    NewTaskComponent,
    CompleteSprintComponent,
    DeleteTasksConfirmComponent
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter},
    NgbActiveModal,
    TaskService,
    SprintService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
