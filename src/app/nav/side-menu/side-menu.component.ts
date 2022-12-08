import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.auth.logout().subscribe(isLogout => {
      if (isLogout) this.router.navigate(['login'])
    })
  }
}
