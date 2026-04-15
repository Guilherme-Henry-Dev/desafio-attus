import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';
import { Todo } from './todo.actions'

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

export const selectPendingTodos = createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.filter((todo: Todo) => !todo.completed)
);

export const selectLoading = createSelector(
  selectTodoState,
  (state: TodoState) => state.loading
);

export const selectError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error
);