import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  private readonly fb = inject(FormBuilder);

  protected users = this.userService.filteredUsers;
  protected loading = this.userService.loading;
  protected searchControl = new FormControl('');
  protected modalOpen = false;
  protected selectedUser?: User;
  protected userForm: FormGroup;

  get isModalOpen(): boolean {
    return this.modalOpen;
  }

  get modalTitle(): string {
    return this.selectedUser ? 'Editar usuário' : 'Adicionar novo usuário';
  }

  constructor() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      phoneType: ['CELULAR', Validators.required]
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.userService.loadUsers(query || '')),
      takeUntilDestroyed()
    ).subscribe();
  }

  ngOnInit(): void {
    this.userService.loadUsers('').subscribe();
  }

  openModal(user?: User): void {
    this.selectedUser = user;

    if (user) {
      this.userForm.setValue({
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        phone: user.phone,
        phoneType: user.phoneType
      });
    } else {
      this.userForm.reset({ phoneType: 'CELULAR' });
    }

    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
    this.selectedUser = undefined;
    this.userForm.reset({ phoneType: 'CELULAR' });
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.value as Omit<User, 'id'>;

    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser.id!, formValue).subscribe(() => {
        this.userService.loadUsers(this.searchControl.value || '').subscribe();
        this.closeModal();
      });
    } else {
      this.userService.addUser(formValue).subscribe(() => {
        this.userService.loadUsers(this.searchControl.value || '').subscribe();
        this.closeModal();
      });
    }
  }

  deleteUser(id: string): void {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.userService.loadUsers(this.searchControl.value || '').subscribe();
      });
    }
  }
}
