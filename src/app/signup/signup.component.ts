import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  private _user_name = new FormControl('', [
    Validators.maxLength(16),
  ]);

  private _email = new FormControl('', [
    Validators.email,
  ]);

  private _password = new FormControl('', [
    Validators.required,
  ]);

  public userForm: FormGroup = this.fb.group({
    user_name: this._user_name,
    email: this._email,
    password: this._password,
  });
  private subscriptions = new Subscription();

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  get user_name() { return this._user_name }
  get email() { return this._email }
  get password() { return this._password }

  /**
   * create new user
   */
  public addUser(): void {
    this.subscriptions.add(
      this.userService.addUser(this.userForm.value).subscribe(user => {
        if (user) {
          this.router.navigate(['']);
        } else {
          alert('signup failure');
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
