import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tweet, TweetInfo, TweetList } from '../models/tweet-params';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private _tweet$ = new Subject<Tweet|null>();

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * http communication for creating new tweet
   * @param tweet tweet message
   */
  public addTweet(tweet: Tweet) {
    return this.http.post<TweetInfo>(
      environment.apiUrl + '/tweet',
      tweet, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        observe: 'response',
        withCredentials: true,
      }
    ).pipe(
      switchMap(res => of(res.status === 201 ? res.body?.tweet ?? null : null)),
      tap(val => this.setTweet(val))
    )
  }

  get tweet$() {
    return this._tweet$.asObservable()
  }

  /**
   * pass new tweet to observer
   * @param tweet
   */
  setTweet(tweet: Tweet|null) {
    this._tweet$.next(tweet);
  }

  /**
   * http communication for getting tweet detail
   * @param tweet_id
   */
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

  /**
   * http communication for getting tweet list
   */
  public getTweetList(): Observable<Tweet[]> {
    const subject = new Subject<Tweet[]>();
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
