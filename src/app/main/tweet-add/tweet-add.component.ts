import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    private dialogRef: MatDialogRef<TweetAddComponent>,
  ) { }

  ngOnInit(): void {
  }

  get message() { return this.tweetForm.get('message') }

  /**
   * create new tweet
   */
  public addTweet(): void {
    this.tweetService.addTweet(this.tweetForm.value).subscribe();
    this.dialogRef.close();
  }

  /**
   * cancel method
   */
  public cancel(): void {
    this.dialogRef.close();
  }

}
