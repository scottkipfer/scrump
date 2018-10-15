import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Board} from '../../models';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private boardUrl: string = 'http://localhost:2700/v1/boards';
  commandUrl: string ='http://localhost:2700/command';

  public getBoard(boardName: string) {
    const url = `${this.boardUrl}/${boardName}`
    return this.http.get<Board>(url, httpOptions);
  }

  public createBoard(board: Board) {
    return this.http.post<Board>(this.boardUrl, board, httpOptions);
  }

  public updateTaskPosition(fromIndex: number, toIndex: number, board: Board) {
    const url = `${this.commandUrl}/updateTaskPosition/${board.name}`;
    return this.http.post(url, {fromIndex, toIndex}, httpOptions);
  }

  constructor(private http: HttpClient) { }
}
