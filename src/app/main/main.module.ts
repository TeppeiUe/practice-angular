import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { TweetInfoComponent } from './tweet-info/tweet-info.component';
import { HomeComponent } from './home/home.component';
import { NavModule } from '../nav/nav.module';


@NgModule({
  declarations: [
    MainComponent,
    UserListComponent,
    UserInfoComponent,
    TweetListComponent,
    TweetInfoComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NavModule
  ]
})
export class MainModule { }
