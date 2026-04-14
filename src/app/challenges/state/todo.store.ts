@Component({ ... })
export class CartCounterComponent {
  items = signal<Item[]>([]); // Signal de lista
  total = computed(() => this.items().reduce((acc, i) => acc + (i.preco * i.quantidade), 0)); // Computed
  totalChanged = output<number>(); // Novo output() do Angular 17.3

  constructor() {
    effect(() => this.totalChanged.emit(this.total())); // Efeito colateral reativo
  }

  adicionar(item: Item) { this.items.update(list => [...list, item]); }
}