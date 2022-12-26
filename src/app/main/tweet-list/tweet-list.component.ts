import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet-params';
import { AuthService } from 'src/app/services/auth.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {
  public tweetList: Tweet[]|[] = [];
  private current_user_id = 0;

  constructor(
    private tweetService: TweetService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.current_user_id = user?.id ?? 0;
    });

    this.tweetService.getTweetList().subscribe(tweetList => {
      this.tweetList = tweetList;
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
