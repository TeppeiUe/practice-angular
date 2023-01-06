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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
// npm i -s --legacy-peer-deps ngx-material-file-input
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { UserCardComponent } from './share/user-card/user-card.component';
import { TweetCardComponent } from './share/tweet-card/tweet-card.component';
import { FavoriteCardComponent } from './tweet-info/favorite-card/favorite-card.component';
import { SetImgPipe } from './utility/set-img.pipe';


@NgModule({
  declarations: [
    MainComponent,
    UserListComponent,
    UserInfoComponent,
    TweetListComponent,
    TweetInfoComponent,
    HomeComponent,
    UserEditComponent,
    TweetAddComponent,
    UserCardComponent,
    TweetCardComponent,
    FavoriteCardComponent,
    SetImgPipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    NavModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    MaterialFileInputModule,
    FlexLayoutModule,
    TranslateModule
  ]
})
export class MainModule { }
