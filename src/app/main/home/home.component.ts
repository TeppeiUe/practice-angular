import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet-params';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public tweetList: Tweet[]|[] = [];

  constructor(
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.tweetList = user?.tweets ?? [];
    })
  }

}
