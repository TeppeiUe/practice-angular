import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-params';
import { AuthService } from 'src/app/services/auth.service';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() userList: User[] = [];
  private followingList: number[] = [];

  constructor(
    private auth: AuthService,
    private followService: FollowService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.followService.getUserFollowingList(user.id)
        .subscribe(followings => {
          this.followingList = followings.map(f => f.id);
        });
      }
    })
  }

  public setFollowing(user_id: number): boolean {
    return this.followingList.includes(user_id)
  }

  public deleteFollowing(user_id: number) {
    this.followService.deleteFollowing(user_id).subscribe(res => {
      if (res) {
        this.followingList = this.followingList.filter(f => f !== user_id);
      }
    })
  }

  public addFollowing(user_id: number) {
    this.followService.addFollowing(user_id).subscribe(res => {
      if (res) {
        this.followingList.push(user_id);
      }
    })
  }

}
