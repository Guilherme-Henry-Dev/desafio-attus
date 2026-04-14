export class Produto {
  constructor(
    public readonly id: number,
    public descricao: string,
    public quantidadeEstoque: number
  ) {}
}
export class Verdureira {
  private produtos: Produto[] = [
    new Produto(1, 'Maçã', 20),
    new Produto(2, 'Laranja', 0),
    new Produto(3, 'Limão', 20)
  ];

  getDescricaoProduto(produtoId: number): string {
    const produto = this.produtos.find(p => p.id === produtoId);
    return produto 
      ? `${produto.id} - ${produto.descricao} (${produto.quantidadeEstoque}x)`
      : 'Produto não encontrado';
  }

  hasEstoqueProduto(produtoId: number): boolean {
    return this.produtos.some(p => p.id === produtoId && p.quantidadeEstoque > 0);
  }
}

export interface PaginaParams { pagina: number; tamanho: number; }
export interface Pagina<T> { itens: T[]; totalRegistros: number; }

export function filtrarEPaginar<T>(
  data: T[],
  filterFn: (item: T) => boolean,
  params: PaginaParams
): Pagina<T> {
  const filtered = data.filter(filterFn);
  const start = (params.pagina - 1) * params.tamanho;
  return {
    itens: filtered.slice(start, start + params.tamanho),
    totalRegistros: filtered.length
  };
}