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

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  public form = {
    email: null,
    password: null,
  };
  public error: any = null;
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;

  constructor(
    private Auth: AuthService,
    private Token: TokenService,
    private router: Router,
    private Logged: LoggedService,
    private authService: SocialAuthService,
    private httpClient: HttpClient
  ) {}

  onSubmit() {
    const postData = {
      email: this.form.email,
      password: this.form.password,
    };

    if (postData.email && postData.password) {
      this.Auth.login(postData).subscribe({
        next: (data) => {
          this.handelResponse(data);
        },
        error: (err) => {
          this.handleError(err);
        },
      });
    } else {
      this.error = 'Please fill all fields.';
    }
  }

  handelResponse(data: any) {
    this.Token.handel(data.access_token);
    this.Token.setUser(data.user);
    this.Logged.changeAuthStatus(true);
    this.router.navigateByUrl('/home');
  }

  handleError(error: any) {
    this.error = error.error.error;
  }

  // ngOnInit() {}

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
  }

  //signing in events
  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.router.navigateByUrl('/home');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  signInWithFacebook(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.router.navigateByUrl('/home');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
