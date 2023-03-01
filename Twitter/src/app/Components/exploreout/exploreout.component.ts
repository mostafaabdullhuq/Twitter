import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { LoggedService } from 'src/app/Services/logged.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { FacebookLoginProvider } from '@abacritt/angularx-social-login';

import { SignupComponent } from '../signup/signup.component';
import { HashtagService } from 'src/app/Services/hashtag.service';

@Component({
  selector: 'app-exploreout',
  templateUrl: './exploreout.component.html',
  styleUrls: ['./exploreout.component.css'],
})
export class ExploreoutComponent implements OnInit {
  public error: any = null;
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;

  public hashtags: any = [];

  constructor(
    private Auth: AuthService,
    private Token: TokenService,
    private router: Router,
    private Logged: LoggedService,
    private authService: SocialAuthService,
    private httpClient: HttpClient,
    private hashtagService: HashtagService
  ) {}

  //fb
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.authService.signOut();
  }
  //google
  private accessToken = '';
  getAccessToken(): void {
    this.authService
      .getAccessToken(GoogleLoginProvider.PROVIDER_ID)
      .then((accessToken) => (this.accessToken = accessToken));
  }

  getGoogleCalendarData(): void {
    if (!this.accessToken) return;

    this.httpClient
      .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      })
      .subscribe((events) => {
        alert('Look at your console');
        console.log('events', events);
      });
  }

  refreshToken(): void {
    this.authService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
    this.hashtagService.trending(7, 20).subscribe({
      next: (response) => {
        this.hashtags = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //signing in events
  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        //redirect to home?
      })
      .catch((err) => {
        //unsuccessful log in error?
      });
  }

  signInWithFacebook(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user) => {})
      .catch((err) => {});
  }
}
