import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet-params';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-info',
  templateUrl: './tweet-info.component.html',
  styleUrls: ['./tweet-info.component.scss']
})
export class TweetInfoComponent implements OnInit {
  public tweetInfo: Tweet|null = null;

  constructor(
    private route: ActivatedRoute,
    private tweetService: TweetService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      take(1)
    ).subscribe(params => {
      const tweet_id = params.get('id');
      if (tweet_id !== undefined) {
        this.tweetService.getTweetInfo(Number(tweet_id))
        .subscribe(tweet => this.tweetInfo = tweet)
      }
    });
  }

}
