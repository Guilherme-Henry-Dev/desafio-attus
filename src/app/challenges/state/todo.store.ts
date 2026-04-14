import { Injectable, signal, computed } from '@angular/core';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoStore {
  private todos = signal<Todo[]>([]);

  todosList = this.todos.asReadonly();
  completedCount = computed(() => this.todos().filter(t => t.completed).length);
  totalCount = computed(() => this.todos().length);

  addTodo(title: string): void {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false
    };
    this.todos.update(todos => [...todos, newTodo]);
  }

  toggleTodo(id: string): void {
    this.todos.update(todos =>
      todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  removeTodo(id: string): void {
    this.todos.update(todos => todos.filter(t => t.id !== id));
  }
}