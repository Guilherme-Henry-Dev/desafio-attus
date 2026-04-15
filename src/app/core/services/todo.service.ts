import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private http: HttpClient) {}


  loadTodos(): Observable<Todo[]> {
    return of([
      { id: '1', title: 'Learn Angular', completed: false },
      { id: '2', title: 'Build awesome app', completed: true },
      { id: '3', title: 'Write tests', completed: false }
    ]).pipe(delay(500));
  }
}