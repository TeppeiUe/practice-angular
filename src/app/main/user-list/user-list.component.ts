import { Component, OnInit } from '@angular/core';
import { UserBase } from 'src/app/models/user-params';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public userList: UserBase[] = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getUserList().subscribe(userList => {
      this.userList = userList;
    })
  }

}
