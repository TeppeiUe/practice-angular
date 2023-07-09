import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-add',
  templateUrl: './tweet-add.component.html',
  styleUrls: ['./tweet-add.component.scss']
})
export class TweetAddComponent implements OnInit {
  private _message = new FormControl('', [
    Validators.required,
    Validators.maxLength(140),
  ]);

  public tweetForm: FormGroup = this.fb.group({
    message: this._message
  });
  

  constructor(
    private tweetService: TweetService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TweetAddComponent>,
  ) { }

  ngOnInit(): void {
  }

  get message() { return this._message }

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
