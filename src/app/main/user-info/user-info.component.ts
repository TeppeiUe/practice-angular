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
  protected is_following = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private followService: FollowService,
    private favoriteService: FavoriteService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      take(1)
    ).subscribe(params => {
      this.user_id = Number(params.get('id') ?? 0);
    });

    if (this.user_id) {
      this.getUserInfo();
      this.followService.getUserFollowerList(this.user_id)
      .subscribe(followers => {
        this.auth.user$.subscribe(user => {
          if (user) {
            const followerIdList = followers.map(f => f.id);
            this.is_following = followerIdList.includes(user.id);
          }
        });
      });
    }
  }

  public deleteFollowing() {
    this.followService.deleteFollowing(this.user_id).subscribe(res => {
      if (res) this.is_following = false;
    });
  }

  public addFollowing() {
    this.followService.addFollowing(this.user_id).subscribe(res => {
      if (res) this.is_following = true;
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
