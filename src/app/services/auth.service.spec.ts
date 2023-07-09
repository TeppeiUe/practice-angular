import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { User, UserAuth } from '../models/user-params';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  const { apiUrl } = environment;
  const user: User = {
    id: 1,
    user_name: '',
    profile: '',
    image: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('user getter/setter', () => {
    it('should return null at initial time', () => {
      service.user$.subscribe(u => {
        expect(u).toEqual(null);
      });
    });

    it('should return setUser value', () => {
      service.setUser(user);
      service.user$.subscribe(u => {
        expect(u).toBe(user);
      });
    });
  });

  describe('login method', () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should add options to HttpClient request', () => {
      service.login({} as UserAuth).subscribe();
      const { request } = httpTestingController.expectOne(() => true);
      expect(request.url).toEqual(apiUrl + '/login');
      expect(request.method).toEqual('POST');
      expect(request.body).toEqual({});
      expect(request.headers.has('Content-Type')).toBeTruthy();
      expect(request.headers.get('Content-Type')).toEqual('application/json');
      expect(request.withCredentials).toBeTruthy();
    });

    it('should return user after HttpClient request successfully', () => {
      service.login({} as UserAuth).subscribe(res => {
        expect(res).toEqual(user);
      });
      httpTestingController.expectOne({}).flush({ user });
      service.user$.subscribe(u => {
        expect(u).toEqual(user);
      });
    });

    it('should return null after HttpClient request successfully', () => {
      service.setUser(user);
      service.login({} as UserAuth).subscribe(res => {
        expect(res).toEqual(null);
      });
      // UserInfo型のレスポンスでない場合
      httpTestingController.expectOne({}).flush({});
      service.user$.subscribe(u => {
        expect(u).toEqual(null);
      });
    });

    it('should return null after HttpClient request unsuccessfully', () => {
      service.login({} as UserAuth).subscribe(res => {
        expect(res).toEqual(null);
      });
      httpTestingController.expectOne({}).flush({}, {
        status: 400,
        statusText: 'Bad Request'
      });
    });
  });

  describe('logout method', () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should add options to HttpClient request', () => {
      service.logout().subscribe();
      const { request } = httpTestingController.expectOne(() => true);
      expect(request.url).toEqual(apiUrl + '/logout');
      expect(request.method).toEqual('DELETE');
      expect(request.body).toEqual(null);
      expect(request.withCredentials).toBeTruthy();
    });

    it('should return true after HttpClient request successfully', () => {
      service.setUser(user);
      service.logout().subscribe(res => {
        expect(res).toBeTruthy();
      });
      httpTestingController.expectOne({}).flush({}, {
        status: 204,
        statusText: 'No Content'
      });
      service.user$.subscribe(u => {
        expect(u).toEqual(null);
      });
    });

    it('should return false after HttpClient request unsuccessfully', () => {
      service.setUser(user);
      service.logout().subscribe(res => {
        expect(res).toBeFalsy();
      });
      httpTestingController.expectOne({}).flush({}, {
        status: 400,
        statusText: 'Bad Request'
      });
      service.user$.subscribe(u => {
        expect(u).toEqual(user);
      });
    });
  });

  describe('authCheck method', () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should return true with user observable not null', () => {
      service.setUser(user);
      service.authCheck().subscribe(res => {
        expect(res).toBeTruthy();
      });
    });

    it('should add options to HttpClient request', () => {
      service.authCheck().subscribe();
      const { request } = httpTestingController.expectOne(() => true);
      expect(request.url).toEqual(apiUrl + '/session');
      expect(request.method).toEqual('POST');
      expect(request.body).toEqual(null);
      expect(request.withCredentials).toBeTruthy();
    });

    it('should return true after HttpClient request successfully', () => {
      service.authCheck().subscribe(res => {
        expect(res).toBeTruthy();
      });
      httpTestingController.expectOne({}).flush({ user });
      service.user$.subscribe(u => {
        expect(u).toEqual(user);
      });
    });

    it('should return false after HttpClient request successfully', () => {
      service.authCheck().subscribe(res => {
        expect(res).toBeFalsy();
      });
      // UserInfo型のレスポンスでない場合
      httpTestingController.expectOne({}).flush({});
      service.user$.subscribe(u => {
        expect(u).toEqual(null);
      });
    });

    it('should return false after HttpClient request unsuccessfully', () => {
      service.authCheck().subscribe(res => {
        expect(res).toBeFalsy();
      });
      httpTestingController.expectOne({}).flush({}, {
        status: 400,
        statusText: 'Bad Request'
      });
      service.user$.subscribe(u => {
        expect(u).toEqual(null);
      });
    });
  });
});
