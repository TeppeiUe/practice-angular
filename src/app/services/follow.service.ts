import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserList } from '../models/user-params';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(
    private http: HttpClient,
  ) { }

  public getUserFollowingList(user_id: number): Observable<User[]|[]> {
    const subject = new Subject<User[]|[]>();
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

  public getUserFollowerList(user_id: number): Observable<User[]|[]> {
    const subject = new Subject<User[]|[]>();
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
