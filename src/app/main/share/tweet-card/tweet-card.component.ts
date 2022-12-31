import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tweet } from 'src/app/models/tweet-params';
import { AuthService } from 'src/app/services/auth.service';
import { TweetInfoComponent } from '../../tweet-info/tweet-info.component';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {
  @Input() tweetList: Tweet[]|[] = [];
  @Input() isHeader = true;
  private current_user_id = 0;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.current_user_id = user?.id ?? 0;
    });
  }

  public openTweetInfo(ind: number, tweet: Tweet) {
    if (!this.isHeader) {
      this.auth.user$.subscribe(user => {
        if (user) {
          const { id, user_name, image = '', profile = '' } = user;
          tweet.user = { id, user_name, image, profile };
        }
      });
    }

    this.dialog.open(TweetInfoComponent, {
      width: '600px',
      data: tweet,
    })
  }

  public setFavorite(tweet: Tweet):boolean {
    return !!(tweet.favorites?.filter(favorite =>
      favorite.id === this.current_user_id).length ?? 0)
  }

  public deleteFavorite(e: MouseEvent, ind: number) {
    e.stopPropagation();
    const target = this.tweetList[ind];
    target.favorites = target.favorites?.filter(user => user.id !== this.current_user_id)
  }

  public addFavorite(e: MouseEvent, ind: number) {
    e.stopPropagation();
    this.auth.user$.subscribe(user => {
      if (user) {
        const target = this.tweetList[ind];
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
  }

}
