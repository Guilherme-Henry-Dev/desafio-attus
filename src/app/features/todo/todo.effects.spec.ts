import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TodoEffects } from './todo.effects';
import { TodoService } from '../../core/services/todo.service';
import { loadTodos, loadTodosSuccess } from './todo.actions';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('TodoEffects', () => {
  let actions$: Observable<any>;
  let effects: TodoEffects;
  let todoServiceSpy = {
    loadTodos: vi.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideMockActions(() => actions$), 
        { provide: TodoService, useValue: todoServiceSpy }
      ]
    });

    effects = TestBed.inject(TodoEffects);
  });

  it('should load todos successfully', () => {
    const mockTodos = [{ id: '1', title: 'Test', completed: false }];
    todoServiceSpy.loadTodos.mockReturnValue(of(mockTodos));
    
    actions$ = of(loadTodos());

    effects.loadTodos$.subscribe(result => {
      expect(result).toEqual(loadTodosSuccess({ todos: mockTodos }));
      expect(todoServiceSpy.loadTodos).toHaveBeenCalled();
    });
  });
});