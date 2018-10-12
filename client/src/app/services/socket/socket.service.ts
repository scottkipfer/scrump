import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as socketIo from 'socket.io-client';


const SOCKET_URL = 'http://localhost:2700';

@Injectable()
export class SocketService {
  private socket: socketIo.SocketIOClient.Socket
  public connected$ = new BehaviorSubject<boolean>(false);


  // Events
  taskCreated$: Observable<any>;


  constructor() {
    this.socket = socketIo(SOCKET_URL);
    this.socket.on('connect', () => this.connected$.next(true));
    this.socket.on('disconnect', () => this.connected$.next(false));
    this.socket.join('events');

    // Each Observable is used By NGRX
    this.taskCreated$ = this.socket.listen('TaskCreated');
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
      // displose of the event listener when unsubscribed
      return () => this.socket.off(event);
    });
  }

} 
