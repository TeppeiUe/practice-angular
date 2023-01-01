import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  distinct,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  tap
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserInfo, UserAuth } from '../models/user-params';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user$ = new BehaviorSubject<User|null>(null);

  constructor(
    private http: HttpClient,
  ) { }

  get user$() {
    return this._user$.asObservable().pipe(take(1))
  }

  /**
   * pass new values to observer
   * @param user
   */
  setUser(user: User|null) {
    this._user$.next(user)
  }

  /**
   * http communication for login
   * @param userAuth
   */
  login(userAuth: UserAuth) {
    const subject = new Subject<User|null>();
    const subscription = this.http.post<UserInfo>(
      environment.apiUrl + '/login',
      userAuth, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        observe: 'response',
        withCredentials: true,
      }
    ).subscribe({
      next: res => {
          const user = res.body?.user ?? null;
          subject.next(user);
          this.setUser(user);
      },
      error: () => subject.next(null),
      complete: () => {
        subscription.unsubscribe();
      }
    });

    return subject.asObservable()
  }


  /**
   * http communication for logout
   */
  logout(): Observable<boolean> {
    return this.http.delete(
      environment.apiUrl + '/logout', {
        withCredentials: true,
        observe: 'response'
      }
    ).pipe(
      switchMap(res => of(res.status === 204))
    )
  }

  /**
   * login check
   */
  authCheck(): Observable<boolean> {
    return this.user$.pipe(
      distinct(),
      switchMap(user => {
        if (user === null) {
          return this.http.post<UserInfo>(
            environment.apiUrl + '/session',
            null,
            { withCredentials: true }
          ).pipe(
            catchError(() => of(null)),
            map(userInfo => userInfo?.user ?? null),
          )
        } else {
          return of(user)
        }
      }),
      tap(user => this.setUser(user)),
      map(user => !!user),
    )

  }
}
