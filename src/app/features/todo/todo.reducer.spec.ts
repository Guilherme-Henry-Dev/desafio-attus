import { todoReducer, TodoState } from './todo.reducer';
import { loadTodos, loadTodosSuccess, loadTodosError, toggleTodoComplete } from './todo.actions';

describe('TodoReducer', () => {
  it('should return the initial state', () => {
    const initialState: TodoState = {
      todos: [],
      loading: false,
      error: null
    };

    expect(todoReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle loadTodos action', () => {
    const action = loadTodos();
    const expectedState: TodoState = {
      todos: [],
      loading: true,
      error: null
    };

    expect(todoReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle loadTodosSuccess action', () => {
    const mockTodos = [
      { id: '1', title: 'Test Todo', completed: false }
    ];
    const action = loadTodosSuccess({ todos: mockTodos });
    const expectedState: TodoState = {
      todos: mockTodos,
      loading: false,
      error: null
    };

    expect(todoReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle loadTodosError action', () => {
    const errorMessage = 'Failed to load';
    const action = loadTodosError({ error: errorMessage });
    const expectedState: TodoState = {
      todos: [],
      loading: false,
      error: errorMessage
    };

    expect(todoReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle toggleTodoComplete action', () => {
    const initialState: TodoState = {
      todos: [
        { id: '1', title: 'Test Todo', completed: false },
        { id: '2', title: 'Another Todo', completed: true }
      ],
      loading: false,
      error: null
    };

    const action = toggleTodoComplete({ id: '1' });
    const result = todoReducer(initialState, action);

    expect(result.todos[0].completed).toBe(true);
    expect(result.todos[1].completed).toBe(true); // unchanged
  });
});