import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet-params';
import { AuthService } from 'src/app/services/auth.service';

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
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.current_user_id = user?.id ?? 0;
    });
  }

    public setFavorite(tweet: Tweet):boolean {
    return !!(tweet.favorites?.filter(favorite =>
      favorite.id === this.current_user_id).length ?? 0)
  }

  public deleteFavorite(ind: number) {
    const target = this.tweetList[ind];
    target.favorites = target.favorites?.filter(user => user.id !== this.current_user_id)
  }

  public addFavorite(ind: number) {
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
