import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User, UserEditForm } from 'src/app/models/user-params';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  private _user_name = new FormControl('', [
    Validators.maxLength(16),
  ]);

  private _profile = new FormControl('', [
    Validators.maxLength(140),
  ]);

  private _image = new FormControl('');

  public userForm: FormGroup = this.fb.group({
    user_name: this._user_name,
    profile: this._profile,
    image: this._image,
    tmp: [''], // temporary form control for file upload
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

  get user_name() { return this._user_name }
  get profile() { return this._profile }
  get image() { return this._image }

  /**
   * modify user information
   */
  public updateUser(): void {
    const userEditForm: UserEditForm = this.userForm.value;
    this.userService.modifyUserInfo(userEditForm).subscribe(res => {
      if (res) {
        this.auth.user$.subscribe(user => {
          if (user) {
            user = {
              ...user,
              ...userEditForm
            } as User;
            this.auth.setUser(user);
          }
        });
      }
    });

    // TODO: 失敗した場合
    this.dialogRef.close(userEditForm);
  }

  /**
   * cancel method
   */
  public cancel(): void {
    this.dialogRef.close(null);
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

}
