import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet-params';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {
  public tweetList: Tweet[]|[] = [];

  constructor(
    private tweetService: TweetService,
  ) { }

  ngOnInit(): void {
    this.tweetService.getTweetList().subscribe(tweetList => {
      this.tweetList = tweetList;
    });
  }

}
