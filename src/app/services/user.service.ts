import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserInfo, UserList, UserPut } from '../models/user-params';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * http communication for creating new user
   * @param user
   */
  public addUser(user: User): Observable<User|null> {
    const subject = new Subject<User|null>();
    const subscription = this.http.post<UserInfo>(
      environment.apiUrl + '/user',
      user, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        observe: 'response',
        withCredentials: true,  // Cookieを受け取るために必要
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

  /**
   * http communication for getting user information
   * @param user_id
   */
  public getUserInfo(user_id: number): Observable<User|null> {
    const subject = new Subject<User|null>();
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

  /**
   * http communication for getting user list
   */
  public getUserList(): Observable<User[]> {
    const subject = new Subject<User[]>();
    const subscription = this.http.get<UserList>(
      environment.apiUrl + '/users', {
        observe: 'response',
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

  /**
   * http communication for updating user information
   * @param user
   */
  public modifyUserInfo(user: UserPut): Observable<boolean> {
    return this.http.put(
      environment.apiUrl + '/user',
      user, {
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
}
