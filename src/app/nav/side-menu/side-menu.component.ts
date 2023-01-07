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
  protected current_user_id = '';

  constructor(
    public auth: AuthService, // to confirm update contents at html view
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.current_user_id = user?.id.toString() ?? '';
    })
  }

  // routerLink directive isn't working as expected at toolbar toggle menu
  // after added 'shouldReuseRoute' method

  /**
   * routing method
   * @param url
   */
  protected goTo(url = ''): void {
    this.router.navigate([url]);
  }

  /**
   * set style if url matches
   * @param url
   */
  protected setActive(url = ''): string {
    if (!url.indexOf('/')) url = url.slice(1);
    return this.router.url.slice(1) === url ? 'active-link' : ''
  }

  /**
   * open tweet-add dialog
   */
  public addTweet() {
    this.dialog.open(TweetAddComponent, {
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
