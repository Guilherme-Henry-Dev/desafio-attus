import { createAction, props } from '@ngrx/store';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

// Actions
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosError = createAction(
  '[Todo] Load Todos Error',
  props<{ error: string }>()
);
export const toggleTodoComplete = createAction(
  '[Todo] Toggle Todo Complete',
  props<{ id: string }>()
);