import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tweet } from 'src/app/models/tweet-params';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { TweetInfoComponent } from '../../tweet-info/tweet-info.component';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {
  @Input() tweetList: Tweet[] = [];
  @Input() isHeader = true;
  @Input() deleteCard = false;
  private current_user_id = 0;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private favorite: FavoriteService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.current_user_id = user?.id ?? 0;
    });
  }

  /**
   * open tweet-info dialog
   * @param tweet
   */
  public openTweetInfo(tweet: Tweet) {
    this.dialog.open(TweetInfoComponent, {
      width: '600px',
      data: tweet,
    })
  }

  /**
   * tweet favorite ?
   * @param tweet
   * @returns {boolean}
   */
  public setFavorite(tweet: Tweet): boolean {
    return !!(tweet.favorites?.filter(favorite =>
      favorite.id === this.current_user_id).length ?? 0)
  }

  /**
   * remove tweet favorite
   * @param e to prevent other click event
   * @param ind tweetList index
   */
  public deleteFavorite(e: MouseEvent, ind: number) {
    e.stopPropagation();
    const target = this.tweetList[ind];
    this.favorite.deleteFavorite(target.id).subscribe(res => {
      if (res) {
        if (this.deleteCard) {
          // remove target tweet card
          this.tweetList.splice(ind, 1);
        } else {
          // remove only logged-in user's favorite
          target.favorites = target.favorites
            ?.filter(user => user.id !== this.current_user_id);
        }
      }
    });
  }

  /**
   * register tweet favorite
   * @param e to prevent other click event
   * @param ind tweetList index
   */
  public addFavorite(e: MouseEvent, ind: number) {
    e.stopPropagation();
    const target = this.tweetList[ind];
    this.favorite.addFavorite(target.id).subscribe(res => {
      this.auth.user$.subscribe(user => {
        if (user) {
          const { id, user_name, profile, image } = user;
          target.favorites = [
            ...(target.favorites ?? []), {
              id,
              user_name,
              profile,
              image
            }
          ];
        }
      });
    });
  }

  /**
   * set data uri
   * @param img
   */
  protected setImg(img: string): string {
    return img ? 'data:image/jpeg;base64,' + img : ''
  }

}
