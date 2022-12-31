import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tweet, TweetList } from '../models/tweet-params';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(
    private http: HttpClient,
  ) { }

  public addFavorite(tweet_id: number): Observable<boolean> {
    return this.http.post(
      environment.apiUrl + `/tweet/${tweet_id}/favorite`,
      null, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        observe: 'response',
        withCredentials: true,
      }
    ).pipe(
      switchMap(res => of(res.status === 204))
    )
  }

  public deleteFavorite(tweet_id: number): Observable<boolean> {
    return this.http.delete(
      environment.apiUrl + `/tweet/${tweet_id}/favorite`, {
        withCredentials: true,
        observe: 'response'
      }
    ).pipe(
      switchMap(res => of(res.status === 204))
    )
  }

  public getUserFavoriteList(user_id: number): Observable<Tweet[]> {
    const subject = new Subject<Tweet[]>();
    const subscription = this.http.get<TweetList>(
      environment.apiUrl + `/user/${user_id}/favorites`, {
        observe: 'response'
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
