import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserList } from '../models/user-params';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(
    private http: HttpClient,
  ) { }

  public addFollowing(user_id: number): Observable<boolean> {
    return this.http.post(
      environment.apiUrl + `/user/${user_id}/following`,
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

  public deleteFollowing(user_id: number): Observable<boolean> {
    return this.http.delete(
      environment.apiUrl + `/user/${user_id}/following`, {
        withCredentials: true,
        observe: 'response'
      }
    ).pipe(
      switchMap(res => of(res.status === 204))
    )
  }

  public getUserFollowingList(user_id: number): Observable<User[]> {
    const subject = new Subject<User[]>();
    const subscription = this.http.get<UserList>(
      environment.apiUrl + `/user/${user_id}/followings`, {
        observe: 'response'
      }
    ).subscribe({
      next: res => subject.next(res.body?.users ?? []),
      error: () => subject.next([]),
      complete: () => {
        subscription.unsubscribe();
      }
    });

    return subject.asObservable()
  }

  public getUserFollowerList(user_id: number): Observable<User[]> {
    const subject = new Subject<User[]>();
    const subscription = this.http.get<UserList>(
      environment.apiUrl + `/user/${user_id}/followers`, {
        observe: 'response'
      }
    ).subscribe({
      next: res => subject.next(res.body?.users ?? []),
      error: () => subject.next([]),
      complete: () => {
        subscription.unsubscribe();
      }
    });

    return subject.asObservable()
  }
}
