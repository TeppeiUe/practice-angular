import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';
import { TweetInfoComponent } from './tweet-info/tweet-info.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'users', component: UserListComponent },
      { path: 'tweets', component: TweetListComponent },
      { path: 'user/:id', component: UserInfoComponent },
      { path: 'tweet/:id', component: TweetInfoComponent },
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
