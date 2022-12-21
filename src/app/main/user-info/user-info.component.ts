import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user-params';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs';
import { FollowService } from 'src/app/services/follow.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Tweet } from 'src/app/models/tweet-params';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public userInfo: User|null = null;
  public userList: User[]|[] = [];
  public tweetList: Tweet[]|[] = [];
  private user_id = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private followService: FollowService,
    private favoriteService: FavoriteService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      take(1)
    ).subscribe(params => {
      this.user_id = Number(params.get('id') ?? 0);
    });

    if (this.user_id) this.getUserInfo();
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
      if (user) this.tweetList = user.tweets ?? [];
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
