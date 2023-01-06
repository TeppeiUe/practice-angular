import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tweet } from 'src/app/models/tweet-params';
import { AuthService } from 'src/app/services/auth.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public tweetList: Tweet[] = [];
  private subscription = new Subscription();

  constructor(
    private auth: AuthService,
    private tweetService: TweetService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.tweetList = user?.tweets ?? [];
    });

    // subscription for logged-in user's new tweet
    this.subscription = this.tweetService.tweet$.subscribe(tweet => {
      if (tweet) {
        this.auth.user$.subscribe(user => {
          if (user) {
            const { id, user_name, image } = user;
            tweet = {
              ...tweet,
              user: {
                id,
                user_name,
                image,
              }
            } as Tweet;
          }
        })
        this.tweetList = [tweet, ...this.tweetList];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
