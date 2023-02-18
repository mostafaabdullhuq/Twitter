import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path:'exploreout' , component: ExploreoutComponent},
  { path: 'home', component: HomeComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'notifications', component: NotificationComponent },
  // { path: 'messages', component: MessagesComponent },
  { path: 'bookmarks', component: BookmarksComponent },
  { path: 'settings/account', component: SettingsComponent },
  { path: 'connect', component: ConnectComponent },
  { path: ':user', component: ProfileComponent },
  { path: 'newmessage', component: NewMessageComponent},
];
// const routes: Routes = [
//   { path: '', component: HomeComponent, data: { showNavbar: false } },
//   { path: 'login', component: SigninComponent, data: { showNavbar: false } },
//   { path: 'signup', component: SignupComponent, data: { showNavbar: false } },
//   { path: 'exploreout', component: ExploreoutComponent, data: { showNavbar: true } },
//   { path: 'home', component: HomeComponent, data: { showNavbar: true } },
//   { path: 'explore', component: ExploreComponent, data: { showNavbar: true } },
//   { path: 'notifications', component: NotificationComponent, data: { showNavbar: true } },
//   { path: 'bookmarks', component: BookmarksComponent, data: { showNavbar: true } },
//   { path: 'settings/account', component: SettingsComponent, data: { showNavbar: true } },
//   { path: 'connect', component: ConnectComponent, data: { showNavbar: true } },
//   { path: ':user', component: ProfileComponent, data: { showNavbar: true } },
//   { path: 'newmessage', component: NewMessageComponent, data: { showNavbar: true } },
// ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
