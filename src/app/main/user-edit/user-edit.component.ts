import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public userForm: FormGroup = this.fb.group({
    user_name: ['', Validators.maxLength(16)],
    profile: ['', Validators.maxLength(140)],
    image: [''],
    tmp:[''], // temporary form control for file upload
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private auth: AuthService,
    private dialogRef: MatDialogRef<UserEditComponent>,
  ) {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.userForm.patchValue({
          user_name: user.user_name ?? '',
          profile: user.profile ?? '',
          image: user.image ?? '',
        });
      }
    });

  }

  ngOnInit(): void {
  }

  get user_name() { return this.userForm.get('user_name') }
  get profile() { return this.userForm.get('profile') }
  get image() { return this.userForm.get('image') }

  /**
   * modify user information
   */
  public updateUser(): void {
    const { user_name, profile, image } = this.userForm.value;
    this.userService.modifyUserInfo({
      user_name,
      profile,
      image
    }).subscribe(res => {
      if (res) {
        this.auth.user$.subscribe(user => {
          user!.user_name = user_name;
          user!.profile = profile;
          user!.image = image;
          this.auth.setUser(user);
        });
      }
    });

    this.dialogRef.close();
  }

  /**
   * cancel method
   */
  public cancel(): void {
    this.dialogRef.close();
  }

  /**
   * When file change event occurs, set base64-type image
   * @param event
   */
  public onFileChange(event: Readonly<Event>) {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.resizeImg(reader.result as string).subscribe(image => {
        this.userForm.patchValue({ image });
      })
    }
  }

  /**
   * resize image
   * @param img
   */
  private resizeImg(img: string): Observable<string> {
    const subject = new Subject<string>();
    const imgReader = new Image();
    imgReader.src = img;

    imgReader.onload = () => {
      const maxPx = 100;
      const ratio = imgReader.width / imgReader.height;
      const canvas = document.createElement('canvas');

      canvas.width = (ratio > 1 ? 1 : ratio) * maxPx;
      canvas.height = (ratio > 1 ? 1 / ratio : 1) * maxPx;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(
        imgReader,
        0,
        0,
        canvas.width,
        canvas.height
      );
      subject.next(canvas.toDataURL().split(',')[1]);
      subject.complete();
    }

    imgReader.onerror = err => subject.error(err);

    return subject.asObservable()
  }

  /**
   * set data uri
   * @param img
   */
  protected setImg(img: string): string {
    return img ? 'data:image/jpeg;base64,' + img : ''
  }

}
