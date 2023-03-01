import { Component, OnInit } from '@angular/core';
import { LoggedService } from './Services/logged.service';
import { Router } from '@angular/router';
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
  public loggedIn: boolean = true;
  public isInLogin: boolean = false;
  public isInSignup: boolean = false;
  public isInRequestReset: boolean = false;
  public isInResponseReset: boolean = false;
  public popup = false;
  public user: any;
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
}
