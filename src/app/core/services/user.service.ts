import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, delay, of, tap, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersState = signal<User[]>([
    { id: '1', name: 'Giana Sandrini', email: 'giana@attornatus.com.br', cpf: '000.000.000-00', phone: '47999999999', phoneType: 'CELULAR' }
  ]);
  
  users = this.usersState.asReadonly();
  loading = signal(false);
  private errorState = signal<string | null>(null);
  error = this.errorState.asReadonly();
  private filterQuery = signal('');

  filteredUsers = computed(() => {
    const query = this.filterQuery().toLowerCase().trim();
    return this.usersState().filter(user => {
      const searchable = `${user.name} ${user.email} ${user.cpf} ${user.phone}`.toLowerCase();
      return searchable.includes(query);
    });
  });

  loadUsers(query: string = ''): Observable<User[]> {
    this.errorState.set(null);
    this.filterQuery.set(query || '');
    this.loading.set(true);

    return of(this.filteredUsers()).pipe(
      delay(500),
      tap(() => this.loading.set(false)),
      catchError(() => {
        this.errorState.set('Não foi possível carregar usuários.');
        this.loading.set(false);
        return of([]);
      })
    );
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    const newUser: User = { ...user, id: Date.now().toString() };
    this.usersState.update(users => [...users, newUser]);
    return of(newUser).pipe(
      delay(500),
      tap(() => this.errorState.set(null))
    );
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    this.usersState.update(users => 
      users.map(u => u.id === id ? { ...u, ...user } : u)
    );
    const updated = this.usersState().find(u => u.id === id)!;
    return of(updated).pipe(
      delay(500),
      tap(() => this.errorState.set(null))
    );
  }

  deleteUser(id: string): Observable<void> {
    this.usersState.update(users => users.filter(u => u.id !== id));
    return of(void 0).pipe(
      delay(500),
      tap(() => this.errorState.set(null))
    );
  }
}