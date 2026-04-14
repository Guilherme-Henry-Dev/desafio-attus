import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list';
import { User } from '../../../core/models/user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the add user modal', () => {
    component.openModal();
    expect(component.isModalOpen).toBe(true);
    expect(component.modalTitle).toBe('Adicionar novo usuário');
  });

  it('should open the edit user modal with existing user data', () => {
    const sampleUser: User = {
      id: '1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      cpf: '123.456.789-00',
      phone: '48999999999',
      phoneType: 'CELULAR'
    };

    component.openModal(sampleUser);
    expect(component.isModalOpen).toBe(true);
    expect(component.modalTitle).toBe('Editar usuário');
  });
});
