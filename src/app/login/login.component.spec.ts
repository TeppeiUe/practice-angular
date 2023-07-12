import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { User } from '../models/user-params';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form & HTML view setting', () => {
    let button: HTMLButtonElement;

    beforeEach(() => {
      button = fixture.debugElement.query(By.css('button')).nativeElement;
    });

    it('should be empty & required option at default email', () => {
      const { errors, value } = component.email;
      expect(value).toEqual('');
      expect(errors!['required']).toBeTruthy();
    });

    it('should be invalid with incorrect email', () => {
      component.userForm.patchValue({ email: 'test' });
      fixture.detectChanges();

      const { errors } = component.email;
      expect(errors!['email']).toBeTruthy();
    });

    it('should be empty & required option at default password', () => {
      const { errors, value } = component.password;
      expect(value).toEqual('');
      expect(errors!['required']).toBeTruthy();
    });

    it('should be valid with correct form', () => {
      component.userForm.patchValue({
        email: 'test@test.com',
        password: 'test'
      });
      fixture.detectChanges();
      expect(button.disabled).toBeFalsy();
      expect(component.userForm.invalid).toBeFalsy();
    });

  });

  describe('login method', () => {
    it('should transition to home when authService.login return User',
      () => {
        authService.login.and.returnValue(of({
          id: 1,
          user_name: '',
          profile: '',
          image: '',
        } as User));
        component.login();
        // expect(router.navigate).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['']);
    });

    it('should be failed when authService.login return null', () => {
        authService.login.and.returnValue(of(null));
        component.login();
        expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
