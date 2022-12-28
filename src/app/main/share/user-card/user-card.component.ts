import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-params';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() userList: User[]|[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
