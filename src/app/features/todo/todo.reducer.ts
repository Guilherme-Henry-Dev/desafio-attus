import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../core/services/todo.service';
import { loadTodos, loadTodosSuccess, loadTodosError, toggleTodoComplete } from './todo.actions';

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null
};

export const todoReducer = createReducer(
  initialState,
  on(loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false
  })),
  on(loadTodosError, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(toggleTodoComplete, (state, { id }) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }))
);