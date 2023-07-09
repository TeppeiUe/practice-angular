import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetAddComponent } from './tweet-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TweetService } from 'src/app/services/tweet.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Tweet } from 'src/app/models/tweet-params';
import { By } from '@angular/platform-browser';

describe('TweetAddComponent', () => {
  let component: TweetAddComponent;
  let fixture: ComponentFixture<TweetAddComponent>;
  let tweetService: jasmine.SpyObj<TweetService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<TweetAddComponent>>;

  const message = 'test message';

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('<MatDialogRef<TweetAddComponent>>', [
      'close'
    ]);
    tweetService = jasmine.createSpyObj('TweetService', [
      'addTweet'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ TweetAddComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: TweetService, useValue: tweetService },
        { provide: MatDialogRef<TweetAddComponent>, useValue: dialogRef },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form & HTML view setting', () => {
    let button: HTMLButtonElement;

    beforeEach(() => {
      button = fixture.debugElement.query(By.css('button')).nativeElement;
    });

    it('should be empty & required option at default message', () => {
      const { errors, value } = component.message;
      expect(value).toEqual('');
      expect(errors!['required']).toBeTruthy();
    });

    it('should be invalid with over 140 words message', () => {
      component.tweetForm.patchValue({ message: 'a'.repeat(141) });
      fixture.detectChanges();
      const { errors } = component.message;
      expect(errors!['maxlength']).toBeTruthy();
    });

    it('should be valid with correct message', () => {
      component.tweetForm.patchValue({ message });
      fixture.detectChanges();
      expect(button.disabled).toBeFalsy();
      expect(component.tweetForm.invalid).toBeFalsy();
    });
  });

  it('addTweet method should call function', () => {
    component.tweetForm.patchValue({ message });
    tweetService.addTweet.and.returnValue(of({} as Tweet));
    component.addTweet();
    // expect(tweetService.addTweet).toHaveBeenCalled();
    expect(tweetService.addTweet).toHaveBeenCalledWith({ message } as Tweet);
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('cancel method should call function', () => {
    component.cancel();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
