import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, finalize, tap } from "rxjs";
import { of } from "rxjs";
import { User } from "./user";

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private usersSignal = signal<User[]>([]);
  
  
  users = this.usersSignal.asReadonly();
  loading = signal(false);

  loadUsers(query: string = '') {
    this.loading.set(true);
    return this.http.get<User[]>(`API_URL?q=${query}`).pipe(
      tap(data => this.usersSignal.set(data)),
      catchError(err => { return of([]); }),
      finalize(() => this.loading.set(false))
    );
  }
}