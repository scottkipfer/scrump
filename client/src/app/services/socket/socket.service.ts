import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { environment } from '../../../environments/environment';


const SOCKET_URL = `${environment.socketServer}`;

@Injectable()
export class SocketService {
  private socket: socketIo.SocketIOClient.Socket
  public connected$ = new BehaviorSubject<boolean>(false);
  public connectedObs$: Observable<boolean> = this.connected$.asObservable();

  // Events
    // Task Events
    taskCreated$: Observable<any>;
    taskUpdated$: Observable<any>;
    taskMoved$: Observable<any>;

    // Board Events
    boardCreated$: Observable<any>;
    taskRemovedFromBoard$: Observable<any>;
    tasksRemovedFromBoard$: Observable<any>;
    taskAddedToBoard$: Observable<any>;
    tasksAddedToBoard$: Observable<any>;
    taskPositionUpdated$: Observable<any>;

    // Sprint Events
    sprintCreated$: Observable<any>;
    sprintTaskPositionUpdated$: Observable<any>;
    taskStatusChanged$: Observable<any>;
    sprintCompleted$: Observable<any>;
    taskRemovedFromSprint$: Observable<any>;
    tasksRemovedFromSprint$: Observable<any>;
    taskAddedToSprint$: Observable<any>;
    tasksAddedToSprint$: Observable<any>;
    taskDeleted$: Observable<any>;

  constructor() {
    this.socket = socketIo(SOCKET_URL);
    this.socket.on('connect', () => this.connected$.next(true));
    this.socket.on('disconnect', () => this.connected$.next(false));
    this.join('events');

    // Each Observable is used By NGRX
    this.taskCreated$ = this.listen('TaskCreated');
    this.taskUpdated$ = this.listen('TaskUpdated');
    this.taskMoved$ = this.listen('TaskMoved');
    this.taskRemovedFromBoard$ = this.listen('TaskRemovedFromBoard');
    this.tasksRemovedFromBoard$ = this.listen('TasksRemovedFromBoard');
    this.taskRemovedFromSprint$ = this.listen('TaskRemovedFromSprint');
    this.tasksRemovedFromSprint$ = this.listen('TasksRemovedFromSprint');
    this.taskAddedToBoard$ = this.listen('TaskAddedToBoard');
    this.tasksAddedToBoard$ = this.listen('TasksAddedToBoard');
    this.taskPositionUpdated$ = this.listen('TaskPositionUpdated');
    this.boardCreated$ = this.listen('BoardCreated');
    this.sprintCreated$ = this.listen('SprintCreated');
    this.sprintCompleted$ = this.listen('SprintCompleted');
    this.taskAddedToSprint$ = this.listen('TaskAddedToSprint');
    this.tasksAddedToSprint$ = this.listen('TasksAddedToSprint');
    this.sprintTaskPositionUpdated$ = this.listen('SprintTaskPositionUpdated');
    this.taskStatusChanged$ = this.listen('TaskStatusChanged');
    this.taskDeleted$ = this.listen('TaskDeleted');
  }

  join(room: string) {
      this.connected$.subscribe(connected => {
      if (connected) {
        this.socket.emit('join', {room});
      }
    });
  }

  disconnect() {
    this.socket.disconnect();
    this.connected$.next(false)
  }

  emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  listen(event: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(event, data => {
        console.group();
        console.log('---- SOCKET INBOUND ----');
        console.log('Action: ', event);
        console.log('Payload: ', data);
        console.groupEnd();

        observer.next(data);
      });
      // dispose of the event listener when unsubscribed
      return () => this.socket.off(event);
    });
  }
} 
