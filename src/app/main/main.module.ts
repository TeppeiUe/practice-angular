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
import { UserEditComponent } from './user-edit/user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TweetAddComponent } from './tweet-add/tweet-add.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MainComponent,
    UserListComponent,
    UserInfoComponent,
    TweetListComponent,
    TweetInfoComponent,
    HomeComponent,
    UserEditComponent,
    TweetAddComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NavModule,
    ReactiveFormsModule,
    MatSidenavModule,
    TranslateModule
  ]
})
export class MainModule { }
