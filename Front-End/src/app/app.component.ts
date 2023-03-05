import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { LoggedService } from './Services/logged.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from './Services/token.service';
import { TweetsService } from './Services/tweets.service';
import { AuthService } from './Services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Twitter';
  auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  public loggedIn: boolean = true;
  public isInLogin: boolean = false;
  public isInSignup: boolean = false;
  public isInRequestReset: boolean = false;
  public isInResponseReset: boolean = false;
  public popup = false;
  public isTweetPopupShown = false;
  public user: any;
  username: any;
  constructor(
    public tweetsClient: TweetsService,
    private Logged: LoggedService,
    private router: Router,
    private Token: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (data: any) => {
        this.user = data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.Logged.authStatus.subscribe((value) => (this.loggedIn = value));
    this.router.events.subscribe((value) => {
      this.isInLogin = false;
      this.isInSignup = false;
      this.isInRequestReset = false;
      this.isInResponseReset = false;
      // this.googleAuthSDK();

      if (!this.loggedIn) {
        if (this.router.url === '/login') {
          this.isInLogin = true;
          this.isInSignup = false;
          this.isInRequestReset = false;
          this.isInResponseReset = false;
        } else if (this.router.url === '/signup') {
          this.isInSignup = true;
          this.isInLogin = false;
          this.isInRequestReset = false;
          this.isInResponseReset = false;
        } else if (this.router.url === '/request-password-reset') {
          this.isInRequestReset = true;
          this.isInLogin = false;
          this.isInSignup = false;
          this.isInResponseReset = false;
        } else if (this.router.url === '/response-password-reset') {
          this.isInResponseReset = true;
          this.isInLogin = false;
          this.isInSignup = false;
          this.isInRequestReset = false;
        }
      } else {
        this.user = this.Token.getUser();
      }
    });
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Logged.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    this.popup = false;
  }

  logoutPopup() {
    this.popup ? (this.popup = false) : (this.popup = true);
  }

  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    if (event.target instanceof HTMLAnchorElement) {
      const element = event.target as HTMLAnchorElement;
      const elementClass = element.className;
      if (elementClass == 'hashtag' || element.className === 'mention') {
        const text = element?.getAttribute('data')?.slice(1);
        event.preventDefault();
        if (elementClass == 'hashtag') {
          this.router.navigate(['/search'], {
            queryParams: { type: 'hashtag_tweets', q: text },
          });
        }
        if (elementClass == 'mention') {
          this.router.navigate([`/${text}`]);
        }
      }
    }
  }

  //google
  // callLoginButton() {
  //   this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
  //     (googleAuthUser:any) => {
  //       let profile = googleAuthUser.getBasicProfile();
  //       console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
  //       console.log('ID: ' + profile.getId());
  //       console.log('Name: ' + profile.getName());
  //       console.log('Image URL: ' + profile.getImageUrl());
  //       console.log('Email: ' + profile.getEmail());

  //      /* Write Your Code Here */

  //     }, (error:any) => {
  //       alert(JSON.stringify(error, undefined, 2));
  //     });
  // }

  // googleAuthSDK() {
  //   (<any>window)['googleSDKLoaded'] = () => {
  //     (<any>window)['gapi'].load('auth2', () => {
  //       this.auth2 = (<any>window)['gapi'].auth2.init({
  //         client_id: '1032393167493-djg4gqrnejak3b4nope9rol5r7j26h97.apps.googleusercontent.com',
  //         cookiepolicy: 'single_host_origin',
  //         scope: 'profile email'
  //       });
  //       this.callLoginButton();
  //     });
  //   }
  //   (function(d, s, id){
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) {return;}
  //     js = d.createElement('script');
  //     js.id = id;
  //     js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
  //     fjs?.parentNode?.insertBefore(js, fjs);
  //   }
  //   (document, 'script', 'google-jssdk'));
  // }
}
