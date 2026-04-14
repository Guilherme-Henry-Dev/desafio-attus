import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserListComponent implements OnInit {
  private readonly userService = inject(UserService);

  protected users = this.userService.users;
  protected loading = this.userService.loading;

  protected searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300), 
      distinctUntilChanged(),
      switchMap(query => this.userService.loadUsers(query || '')),
      takeUntilDestroyed() 
    ).subscribe();
  }

  ngOnInit(): void {
    this.userService.loadUsers('');
  }

  openModal(user?: User): void {
    const action = user ? 'editar' : 'adicionar';
    const name = user ? user.name : '';
    const newName = prompt(`Digite o nome do usuário para ${action}:`, name);
    if (newName) {
      if (user) {
        this.userService.updateUser(user.id!, { ...user, name: newName }).subscribe(() => {
          this.userService.loadUsers(this.searchControl.value || '');
        });
      } else {
        this.userService.addUser({ name: newName, email: '', cpf: '', phone: '', phoneType: 'CELULAR' }).subscribe(() => {
          this.userService.loadUsers(this.searchControl.value || '');
        });
      }
    }
  }

  editUser(user: User): void {
    this.openModal(user);
  }

  deleteUser(id: string): void {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.userService.loadUsers(this.searchControl.value || '');
      });
    }
  }
}