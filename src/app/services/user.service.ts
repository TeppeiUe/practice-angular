import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserInfo, UserList } from '../models/user-params';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  getUserInfo(user_id: number): Observable<User|null> {
    const subject = new Subject<User|null>();
    const params = { user_id };
    const subscription = this.http.get<UserInfo>(
      environment.apiUrl + '/user/' + user_id , {
        observe: 'response'
      }
    ).subscribe({
      next: res => subject.next(res.body?.user ?? null),
      error: () => subject.next(null),
      complete: () => {
        subscription.unsubscribe();
      }
    });

    return subject.asObservable()
  }


  getUserList(): Observable<User[]|[]> {
    const subject = new Subject<User[]|[]>();
    const subscription = this.http.get<UserList>(
      environment.apiUrl + '/users', {
        observe: 'response',
      }
    ).subscribe({
      next: res => subject.next(res.body?.users ?? []),
      error: () => subject.next([]),
      complete: () => {
        // subscription.unsubscribe();
      }
    });

    return subject.asObservable()
  }
}
