import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AuthService } from 'src/app/services/auth.service';
import { TweetService } from 'src/app/services/tweet.service';
import { of } from 'rxjs';
import { User } from 'src/app/models/user-params';
import { Tweet } from 'src/app/models/tweet-params';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let tweetService: jasmine.SpyObj<TweetService>;

  const user = {
    id: 1,
    user_name: '',
    profile: '',
    image: '',
  } as User;

  const tweet = {
    id: 1,
    message: '',
    user_id: 1,
    created_at: new Date(),
  } as Tweet;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', [], {
      user$: of(user)
    });
    tweetService = jasmine.createSpyObj('TweetService', [], {
      tweet$: of(tweet)
    });

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: TweetService, useValue: tweetService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
