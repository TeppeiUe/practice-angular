import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserPut } from 'src/app/models/user-params';
import { UserService } from 'src/app/services/user.service';
import { Subscription, take } from 'rxjs';
import { FollowService } from 'src/app/services/follow.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Tweet } from 'src/app/models/tweet-params';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { TweetService } from 'src/app/services/tweet.service';

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
export class UserInfoComponent implements OnInit, OnDestroy {
  public userInfo: User|null = null;
  public userList: User[] = [];
  public tweetList: Tweet[] = [];
  private user_id = 0;
  protected btnType: buttonType = 0;
  private tabIndex = 0;
  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private tweetService: TweetService,
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

            // subscription for logged-in user's new tweet
            this.subscription = this.tweetService.tweet$.subscribe(tweet => {
              if (tweet && !this.tabIndex) {
                this.tweetList = [tweet, ...this.tweetList];
              }
            });

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

  /**
   * remove following
   */
  public deleteFollowing() {
    this.followService.deleteFollowing(this.user_id).subscribe(res => {
      if (res) this.btnType = buttonType.offFollowing;
    });
  }

  /**
   * register following
   */
  public addFollowing() {
    this.followService.addFollowing(this.user_id).subscribe(res => {
      if (res) this.btnType = buttonType.onFollowing;
    });
  }

  /**
   * open user-edit dialog
   */
  public updateUser() {
    const dialogRef = this.dialog.open(UserEditComponent, {
      disableClose: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((user: UserPut|null) => {
      if (user) {
        const { user_name, profile, image } = user;

        // update profile information
        this.userInfo = {
          ...this.userInfo,
          ...{
            user_name,
            profile,
            image,
          }
        } as User;

        // update current user's tweet in favorite tweets
        if (this.tabIndex === 3) {
          this.auth.user$.subscribe(user => {
            if (user) {
              const current_user_id = user.id;
              this.tweetList = this.tweetList.map(tweet => {
                if (tweet.user_id === current_user_id) {
                  return {
                    ...tweet,
                    user: {
                      ...tweet.user,
                      ...{
                        user_name,
                        profile,
                        image,
                      }
                    }
                  } as Tweet
                } else {
                  return tweet
                }
              });
            }
          });
        }
      }
    });
  }

  /**
   * When tab change event occurs, set new data
   * @param event
   */
  public tabClick(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
    switch (this.tabIndex) {
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

  /**
   * set base user information
   */
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

  /**
   * set following user list
   */
  private getFollowingList() {
    this.followService.getUserFollowingList(this.user_id)
    .subscribe(users => this.userList = users);
  }

  /**
   * set follower user list
   */
  private getFollowerList(): void {
    this.followService.getUserFollowerList(this.user_id)
    .subscribe(users => this.userList = users);
  }

  /**
   * favorite tweet list
   */
  private getFavoriteList(): void {
    this.favoriteService.getUserFavoriteList(this.user_id)
    .subscribe(tweets => this.tweetList = tweets)
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
