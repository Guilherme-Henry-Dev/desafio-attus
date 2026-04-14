import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load users', async () => {
    const users = await lastValueFrom(service.loadUsers());
    expect(users.length).toBe(1);
  });

  it('should add user', async () => {
    const newUser = { name: 'Test', email: 'test@test.com', cpf: '123', phone: '123', phoneType: 'CELULAR' as const };
    const user = await lastValueFrom(service.addUser(newUser));
    expect(user.name).toBe('Test');
  });

  it('should update user', async () => {
    const newUser = { name: 'Test', email: 'test@test.com', cpf: '123', phone: '123', phoneType: 'CELULAR' as const };
    const createdUser = await lastValueFrom(service.addUser(newUser));
    const updatedUser = await lastValueFrom(service.updateUser(createdUser.id!, { name: 'Updated' }));
    expect(updatedUser.name).toBe('Updated');
  });

  it('should delete user', async () => {
    const newUser = { name: 'Test', email: 'test@test.com', cpf: '123', phone: '123', phoneType: 'CELULAR' as const };
    const createdUser = await lastValueFrom(service.addUser(newUser));
    await lastValueFrom(service.deleteUser(createdUser.id!));
    const remainingUsers = await lastValueFrom(service.loadUsers());
    expect(remainingUsers.find(user => user.id === createdUser.id)).toBeUndefined();
  });
});
