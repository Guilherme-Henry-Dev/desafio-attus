import { Component, OnInit, signal, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { UserService } from '../../../core/services/user.service'; 
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);


  users = signal<User[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

 
  modalOpen = false;
  searchControl = new FormControl('');
  userForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
    this.setupSearch();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      id: [null],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      phoneType: ['CELULAR']
    });
  }

  private setupSearch(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(value => this.loadUsers(value || ''));
  }

  loadUsers(query: string = ''): void {
    this.loading.set(true);
    this.userService.loadUsers(query).pipe(
      finalize(() => this.loading.set(false)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res: User[]) => this.users.set(res), // CORREÇÃO: Tipando o 'res' para evitar erro TS7006
      error: () => this.error.set('Erro ao carregar dados.')
    });
  }

  openModal(user?: User): void {
    this.modalOpen = true;
    if (user) {
      this.userForm.patchValue(user);
    } else {
      this.userForm.reset({ phoneType: 'CELULAR' });
    }
  }

  closeModal(): void {
    this.modalOpen = false;
    this.userForm.reset();
  }

  saveUser(): void {
    if (this.userForm.invalid) return;

    const userData = this.userForm.value;
    const request = userData.id 
      ? this.userService.updateUser(userData.id, userData) 
      : this.userService.addUser(userData);

    request.subscribe({
      next: () => {
        this.loadUsers(this.searchControl.value || '');
        this.closeModal();
      },
      error: () => {
        this.error.set('Erro ao processar requisição.');
      }
    });
  }
}