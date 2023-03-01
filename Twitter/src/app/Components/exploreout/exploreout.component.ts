import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
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
export class ExploreoutComponent {
  auth2: any;
  @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;
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
  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
  // signOut(): void {
  //   this.authService.signOut();
  // }
  // //google
  // private accessToken = '';
  // getAccessToken(): void {
  //   this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  // }

  // getGoogleCalendarData(): void {
  //   if (!this.accessToken) return;

  //   this.httpClient
  //     .get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
  //       headers: { Authorization: `Bearer ${this.accessToken}` },
  //     })
  //     .subscribe((events) => {
  //       alert('Look at your console');
  //       console.log('events', events);
  //     });
  // }

  // refreshToken(): void {
  //   this.authService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);
  // }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.googleAuthSDK();

    });
  }

  //signing in events
  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  //     .then(user => {
  //       //redirect to home?
  //     })
  //     .catch(err => {
  //       //unsuccessful log in error?
  //     });

  // }

  signInWithFacebook(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user) => {})
      .catch((err) => {});
  }

  //google
  callLoginButton() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser:any) => {
        // let profile = googleAuthUser.getBasicProfile();
        // console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
      //   console.log('ID: ' + profile.getId());
      //   console.log('Name: ' + profile.getName());
      //   console.log('Image URL: ' + profile.getImageUrl());
      //   console.log('Email: ' + profile.getEmail());
      //  /* Write Your Code Here */
      }, (error:any) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  googleAuthSDK() {
    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '1032393167493-djg4gqrnejak3b4nope9rol5r7j26h97.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLoginButton();
      });
    }
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }
    (document, 'script', 'google-jssdk'));
  }
}
