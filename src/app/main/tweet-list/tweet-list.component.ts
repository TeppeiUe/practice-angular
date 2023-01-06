import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tweet } from 'src/app/models/tweet-params';
import { AuthService } from 'src/app/services/auth.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit, OnDestroy {
  public tweetList: Tweet[] = [];
  private subscription = new Subscription();

  constructor(
    private tweetService: TweetService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.tweetService.getTweetList().subscribe(tweetList => {
      this.tweetList = tweetList;
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
