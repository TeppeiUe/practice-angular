import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tweet, TweetInfo, TweetList } from '../models/tweet-params';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(
    private http: HttpClient,
  ) { }

  public getTweetInfo(tweet_id: number): Observable<Tweet|null> {
    const subject = new Subject<Tweet|null>();
    const subscription = this.http.get<TweetInfo>(
      environment.apiUrl + '/tweet/' + tweet_id, {
        observe: 'response'
      }
    ).subscribe({
      next: res => subject.next(res.body?.tweet ?? null),
      error: () => subject.next(null),
      complete: () => {
        subscription.unsubscribe();
      }
    });

    return subject.asObservable()
  }


  public getTweetList(): Observable<Tweet[]|[]> {
    const subject = new Subject<Tweet[]|[]>();
    const subscription = this.http.get<TweetList>(
      environment.apiUrl + '/tweets', {
        observe: 'response',
      }
    ).subscribe({
      next: res => subject.next(res.body?.tweets ?? []),
      error: () => subject.next([]),
      complete: () => {
        subscription.unsubscribe();
      }
    });

    return subject.asObservable()
  }
}
