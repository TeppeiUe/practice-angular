import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tweet, TweetList } from '../models/tweet-params';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(
    private http: HttpClient,
  ) { }

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
