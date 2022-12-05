import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetInfoComponent } from './tweet-info.component';

describe('TweetInfoComponent', () => {
  let component: TweetInfoComponent;
  let fixture: ComponentFixture<TweetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
