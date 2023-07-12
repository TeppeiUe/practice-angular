import { Component, Inject, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet-params';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-tweet-info',
  templateUrl: './tweet-info.component.html',
  styleUrls: ['./tweet-info.component.scss']
})
export class TweetInfoComponent implements OnInit {
  public tweetInfo: Tweet = this.data;
  private current_user_id = 0;
  protected panelOpenState = false;

  constructor(
    private auth: AuthService,
    private favorite: FavoriteService,
    @Inject(MAT_DIALOG_DATA) private data: Tweet,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.current_user_id = user?.id ?? 0;
    });
  }

  /**
   * tweet favorite ?
   * @param tweet
   * @returns {boolean}
   */
  public setFavorite(tweet: Tweet):boolean {
    return !!(tweet.favorites?.filter(favorite =>
      favorite.id === this.current_user_id).length ?? 0)
  }

  /**
   * remove tweet favorite
   * @param e to prevent other click event
   */
  public deleteFavorite(e: MouseEvent) {
    e.stopPropagation();
    this.favorite.deleteFavorite(this.tweetInfo.id).subscribe(res => {
      this.tweetInfo!.favorites = this.tweetInfo!.favorites
        ?.filter(user => user.id !== this.current_user_id)
    });
  }

  /**
   * register tweet favorite
   * @param e to prevent other click event
   */
  public addFavorite(e: MouseEvent) {
    e.stopPropagation();
    this.favorite.addFavorite(this.tweetInfo.id).subscribe(res => {
      this.auth.user$.subscribe(user => {
        if (user) {
          this.tweetInfo.favorites = [
            ...(this.tweetInfo.favorites ?? []),
            user,
          ];
        }
      });
    });
  }

}
