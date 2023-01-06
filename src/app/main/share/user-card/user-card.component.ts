import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-params';
import { AuthService } from 'src/app/services/auth.service';
import { FollowService } from 'src/app/services/follow.service';

enum buttonType {
  none,
  onFollowing,
  offFollowing,
}

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() userList: User[] = [];
  @Input() deleteCard = false;
  private followingList: number[] = []; // following user_id list
  private current_user_id = 0;

  constructor(
    private auth: AuthService,
    private followService: FollowService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.current_user_id = user.id;
        this.followService.getUserFollowingList(user.id)
        .subscribe(followings => {
          this.followingList = followings.map(f => f.id);
        });
      }
    })
  }

  /**
   * set button type
   * @param user_id
   * @returns button type
   */
  public setButtonType(user_id: number): buttonType {
    if (this.current_user_id === user_id) {
      return buttonType.none
    } else {
      return this.followingList.includes(user_id) ?
        buttonType.onFollowing : buttonType.offFollowing
    }
  }

  /**
   * remove following
   * @param user_id
   */
  public deleteFollowing(user_id: number) {
    this.followService.deleteFollowing(user_id).subscribe(res => {
      if (res) {
        // remove target user card
        if (this.deleteCard) {
          this.userList = this.userList.filter(user => user.id !== user_id);
        }
        this.followingList = this.followingList.filter(f => f !== user_id);
      }
    })
  }

  /**
   * register following
   * @param user_id
   */
  public addFollowing(user_id: number) {
    this.followService.addFollowing(user_id).subscribe(res => {
      if (res) {
        this.followingList.push(user_id);
      }
    })
  }

  /**
   * set data uri
   * @param img
   */
  protected setImg(img: string): string {
    return img ? 'data:image/jpeg;base64,' + img : ''
  }

}
