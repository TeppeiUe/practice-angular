import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public userForm: FormGroup = this.fb.group({
    email: ['', Validators.email], // requireとemailやpatternは同時に使用不可(htmlに記述で可能)
    password: ['', Validators.required],
  });

  private subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.subscriptions.add(
      this.authService.login(this.userForm.value).subscribe(user => {
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
