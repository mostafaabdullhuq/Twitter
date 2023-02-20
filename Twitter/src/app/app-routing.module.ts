import { BeforeLoginService } from './Services/before-login.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { BookmarksComponent } from './Components/bookmarks/bookmarks.component';
import { ConnectComponent } from './Components/connect/connect.component';
import { ExploreComponent } from './Components/explore/explore.component';
import { ExploreoutComponent } from './Components/exploreout/exploreout.component';
import { HomeComponent } from './Components/home/home.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { NewMessageComponent } from './Components/new-message/new-message.component';
import { AfterLoginService } from './Services/after-login.service';
import { RequestResetComponent } from './Components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './Components/password/response-reset/response-reset.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: '',
    component: ExploreoutComponent,
    canActivate: [BeforeLoginService],
  },

  {
    path: 'login',
    component: SigninComponent,
    canActivate: [BeforeLoginService],
  },

  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService],
  },

  {
    path: 'exploreout',
    component: ExploreoutComponent,
    canActivate: [BeforeLoginService],
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'home/:type',
    component: HomeComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'explore',
    component: ExploreComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'notifications',
    component: NotificationComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'bookmarks',
    component: BookmarksComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'settings/account',
    component: SettingsComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'connect',
    component: ConnectComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'newmessage',
    component: NewMessageComponent,
    canActivate: [AfterLoginService],
  },

  {
    path: 'request-password-reset',
    component: RequestResetComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: 'response-password-reset',
    component: ResponseResetComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: ':user',
    component: ProfileComponent,
    canActivate: [AfterLoginService],
  },
];

angular.module('MyApp', ['satellizer'])
  .config(function($authProvider) {
    $authProvider.google({
      clientId: '1032393167493-djg4gqrnejak3b4nope9rol5r7j26h97.apps.googleusercontent.com'
    });
  });
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
