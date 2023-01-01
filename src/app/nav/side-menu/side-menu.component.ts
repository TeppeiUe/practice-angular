import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TweetAddComponent } from 'src/app/main/tweet-add/tweet-add.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  public current_user_id = 0;

  constructor(
    public auth: AuthService, // to confirm update contents at html view
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.current_user_id = user?.id ?? 0;
    })
  }

  /**
   * open tweet-add dialog
   */
  public addTweet() {
    this.dialog.open(TweetAddComponent, {
      width: '600px',
      disableClose: true,
      autoFocus: true,
    });
  }

  /**
   * logout method
   */
  public logout(): void {
    this.auth.logout().subscribe(isLogout => {
      if (isLogout) this.router.navigate(['login'])
    })
  }
}
