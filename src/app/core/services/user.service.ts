import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';
import { delay, of, tap, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersState = signal<User[]>([
    { id: 1, name: 'Giana Sandrini', email: 'giana@attornatus.com.br', cpf: '000.000.000-00', phone: '47999999999', phoneType: 'CELULAR' }
  ]);
  
  users = this.usersState.asReadonly();
  loading = signal(false);

  loadUsers(query: string = ''): Observable<User[]> {
    this.loading.set(true);
    
    const filtered = this.usersState().filter(u => 
      u.name.toLowerCase().includes(query.toLowerCase())
    );

    return of(filtered).pipe(
      delay(500), 
      tap(() => this.loading.set(false))
    );
  }
}