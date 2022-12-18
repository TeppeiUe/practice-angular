import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserEditComponent } from 'src/app/main/user-edit/user-edit.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(
    public auth: AuthService, // to confirm update contents at html view
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  public updateUser() {
    this.dialog.open(UserEditComponent, {
      width: '600px',
      disableClose: true,
      autoFocus: true,
    });
  }

  public logout(): void {
    this.auth.logout().subscribe(isLogout => {
      if (isLogout) this.router.navigate(['login'])
    })
  }
}
