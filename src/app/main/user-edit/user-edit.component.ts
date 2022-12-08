import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public userForm: FormGroup = this.fb.group({
    user_name: ['', Validators.required],
    profile: [''],
    image: [''],
    tmp:[''], // temporary form control for file upload
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private auth: AuthService,
  ) {
    this.auth.user$.subscribe(user => {
      console.log(user);
      this.userForm.patchValue({
        user_name: user?.user_name ?? '',
        profile: user?.profile ?? '',
        image: user?.image ?? '',
      });
    });

  }

  ngOnInit(): void {
  }

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
  }

  public onFileChange(event: Readonly<Event>) {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => this.userForm.patchValue({
      image: reader.result as string
    });
  }

}