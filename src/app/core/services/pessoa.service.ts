import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface Pessoa {
  id: number;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class PessoaService {
  private pessoas: Pessoa[] = [
    { id: 1, nome: 'João Silva' },
    { id: 2, nome: 'Maria Santos' }
  ];

  buscarPorId(id: number): Observable<Pessoa> {
    const pessoa = this.pessoas.find(p => p.id === id);
    return of(pessoa!).pipe(delay(500));
  }

  buscarQuantidadeFamiliares(id: number): Observable<number> {
  
    return of(Math.floor(Math.random() * 5) + 1).pipe(delay(500));
  }
}