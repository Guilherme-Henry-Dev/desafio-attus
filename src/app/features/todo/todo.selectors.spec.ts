import { describe, it, expect } from 'vitest';
import { selectAllTodos, selectLoading } from './todo.selectors';
import { TodoState } from './todo.reducer';

describe('TodoSelectors', () => {
  const initialState: TodoState = {
    todos: [
      { id: '1', title: 'Test Todo', completed: false }
    ],
    loading: false,
    error: null
  };

  it('should select all todos', () => {
    const result = selectAllTodos.projector(initialState);
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Test Todo');
  });

  it('should select loading state', () => {
    const result = selectLoading.projector(initialState);
    expect(result).toBe(false);
  });
});