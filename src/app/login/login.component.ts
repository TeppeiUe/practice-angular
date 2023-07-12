import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserLoginForm } from '../models/user-params';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private _email = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  private _password = new FormControl('', [
    Validators.required
  ]);

  public userForm: FormGroup = this.fb.group({
    email: this._email,
    password: this._password,
  });

  private subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  get email() { return this._email }
  get password() { return this._password }

  /**
   * login method
   */
  public login(): void {
    this.subscriptions.add(
      this.authService.login(this.userForm.value as UserLoginForm)
      .subscribe(user => {
        if (user) {
          this.router.navigate(['']);
        } else {
          alert('login again');
        }
      })
    )
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
