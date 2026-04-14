import { Component, signal, computed, effect, output } from '@angular/core';

interface Item {
  nome: string;
  preco: number;
  quantidade: number;
}

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <h2>Counter</h2>
      <p>Total: {{ total() }}</p>
      <button (click)="adicionar({ nome: 'Item', preco: 10, quantidade: 1 })">Add Item</button>
    </div>
  `
})
export class CounterComponent {
  items = signal<Item[]>([]);
  total = computed(() => this.items().reduce((acc, i) => acc + (i.preco * i.quantidade), 0));
  totalChanged = output<number>();

  constructor() {
    effect(() => this.totalChanged.emit(this.total()));
  }

  adicionar(item: Item) {
    this.items.update(list => [...list, item]);
  }
}