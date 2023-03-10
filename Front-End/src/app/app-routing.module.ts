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
import { ReplyComponent } from './Components/reply/reply.component';
import { SignupComponent } from './Components/signup/signup.component';
import { NewMessageComponent } from './Components/new-message/new-message.component';
import { AfterLoginService } from './Services/after-login.service';
import { RequestResetComponent } from './Components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './Components/password/response-reset/response-reset.component';
import { ConfirmPasswordComponent } from './Components/password/confirm-password/confirm-password.component';
import { TweetDetailsComponent } from './Components/tweet-details/tweet-details.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './Components/settings/change-password/change-password.component';
import { FollowersAndFollowingComponent } from './followers-and-following/followers-and-following.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // redirectTo: '/home',
    // pathMatch: 'full',
    canActivate: [AfterLoginService],
  },

  {
    path: '',
    component: ExploreoutComponent,
    canActivate: [BeforeLoginService],
    // redirectTo: '/home',
    //  pathMatch: 'full'
  },

  {
    path: 'login',
    component: SigninComponent,
    canActivate: [BeforeLoginService],
  },

  // {
  //   path: 'redirect/facebook',
  //   component: SigninComponent,
  //   canActivate: [BeforeLoginService],
  // },

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
    path: 'status/:id',
    component: TweetDetailsComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'explore',
    component: ExploreComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'search',
    component: ExploreComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'search?type=:type&query=:query',
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
    path: 'settings/account',
    component: SettingsComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
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
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'confirm',
    component: ConfirmPasswordComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: ':user',
    component: ProfileComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: ':user/with_replies',
    component: ProfileComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: ':user/media',
    component: ProfileComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: ':user/likes',
    component: ProfileComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: ':user/following',
    component: FollowersAndFollowingComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: ':user/followers',
    component: FollowersAndFollowingComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
