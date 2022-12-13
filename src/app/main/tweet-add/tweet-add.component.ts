import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from 'src/app/services/auth.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-add',
  templateUrl: './tweet-add.component.html',
  styleUrls: ['./tweet-add.component.scss']
})
export class TweetAddComponent implements OnInit {
  public tweetForm: FormGroup = this.fb.group({
    message: ['', [
      Validators.required,
      Validators.maxLength(140),
    ]],
  });

  constructor(
    private tweetService: TweetService,
    private fb: FormBuilder,
    // private auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

  public addTweet(): void {
    this.tweetService.addTweet(this.tweetForm.value).subscribe(tweet => {
      // ajax likeな運用を予定
      // if (tweet) {
      //   this.auth.user$.subscribe(user => {
      //     const tweets = user?.tweets ?? [];
      //     user!.tweets = [...tweets, tweet];
      //     this.auth.setUser(user);
      //   });
      // }
      console.log(tweet);
    });
  }

}
