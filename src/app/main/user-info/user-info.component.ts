import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user-params';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs';
import { FollowService } from 'src/app/services/follow.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Tweet } from 'src/app/models/tweet-params';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';

enum buttonType {
  none,
  edit,
  onFollowing,
  offFollowing,
}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public userInfo: User|null = null;
  public userList: User[] = [];
  public tweetList: Tweet[] = [];
  private user_id = 0;
  protected btnType: buttonType = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private followService: FollowService,
    private favoriteService: FavoriteService,
    private auth: AuthService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      take(1)
    ).subscribe(params => {
      this.user_id = Number(params.get('id') ?? 0);
    });

    if (this.user_id) {
      this.getUserInfo();
      this.auth.user$.subscribe(user => {
        if (user) {
          if (user.id === this.user_id) {
            this.btnType = buttonType.edit;
          } else {
            this.followService.getUserFollowerList(this.user_id)
            .subscribe(followers => {
              const followerIdList = followers.map(f => f.id);
              this.btnType = followerIdList.includes(user.id) ?
                buttonType.onFollowing : buttonType.offFollowing;
            });
          }
        }
      });
    }
  }

  public deleteFollowing() {
    this.followService.deleteFollowing(this.user_id).subscribe(res => {
      if (res) this.btnType = buttonType.offFollowing;
    });
  }

  public addFollowing() {
    this.followService.addFollowing(this.user_id).subscribe(res => {
      if (res) this.btnType = buttonType.onFollowing;
    });
  }

  public updateUser() {
    this.dialog.open(UserEditComponent, {
      width: '600px',
      disableClose: true,
      autoFocus: true,
    });
  }

  public tabClick(event: MatTabChangeEvent) {
    const tabIndex = event.index;
    switch (tabIndex) {
      case 0:
        this.getUserInfo();
        break;
      case 1:
        this.getFollowingList();
        break;
      case 2:
        this.getFollowerList();
        break;
      case 3:
        this.getFavoriteList();
        break;
    }
  }

  private getUserInfo(): void {
    this.userService.getUserInfo(this.user_id)
    .subscribe(user => {
      if (user && user.tweets !== undefined) {
        const { id, user_name, profile, image } = user;
        this.tweetList = user.tweets?.map(tweet => {
          return {
            ...tweet,
            user: {
              id,
              user_name,
              profile,
              image,
            }
          }
        })
      }
      delete user?.tweets;
      this.userInfo = user;
    })
  }

  private getFollowingList() {
    this.followService.getUserFollowingList(this.user_id)
    .subscribe(users => this.userList = users);
  }

  private getFollowerList(): void {
    this.followService.getUserFollowerList(this.user_id)
    .subscribe(users => this.userList = users);
  }

  private getFavoriteList(): void {
    this.favoriteService.getUserFavoriteList(this.user_id)
    .subscribe(tweets => this.tweetList = tweets)
  }

}
