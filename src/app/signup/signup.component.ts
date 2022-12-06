import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  public userForm: FormGroup = this.fb.group({
    user_name: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
  });
  private subscriptions = new Subscription();

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

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
