import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { PessoaService } from '../../core/services/pessoa.service';
import { switchMap, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-reactivity',
  template: `
    <div>
      <p>{{ texto }}</p>
      <p>Contador: {{ contador }}</p>
    </div>
  `
})
export class ReactivityComponent implements OnInit {
  texto = '';
  contador = 0;

  constructor(
    private readonly pessoaService: PessoaService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pessoaService.buscarPorId(1).subscribe((pessoa) => {
      this.texto = `Nome: ${pessoa.nome}`;
      this.cdr.markForCheck();
    });

    setInterval(() => {
      this.contador++;
      this.cdr.markForCheck();
    }, 1000);

    const pessoaId = 2; // Exemplo
    this.pessoaService.buscarPorId(pessoaId).pipe(
      switchMap(pessoa =>
        this.pessoaService.buscarQuantidadeFamiliares(pessoa.id).pipe(
          map(qtd => ({ nome: pessoa.nome, qtd }))
        )
      ),
      takeUntilDestroyed()
    ).subscribe(res => {
      this.texto = `Nome: ${res.nome} | familiares: ${res.qtd}`;
    });
  }
}