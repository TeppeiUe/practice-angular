import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-params';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit {
  @Input() userList: User[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
