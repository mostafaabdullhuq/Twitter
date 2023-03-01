import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  public error: any = null;
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
  };
  constructor(
    public tweetsClient: TweetsService,
    private Auth: AuthService,
    private myRoute: ActivatedRoute,
    private router: Router
  ) {}
  public user: any;

  ngOnInit(): void {
    let userName = this.myRoute.snapshot.params['user'];
    this.tweetsClient.getAuthedTweets(userName).subscribe({
      next: (data: any) => {
        this.user = data.user;
        this.form = {
          email: this.user.email || '',
          password: this.user.password || null,
          password_confirmation: this.user.password_confirmation || null,
        };
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    this.Auth.changePasswordSetting(this.form).subscribe({
      next: (data) => {
        this.handleResponse(data);
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }
  handleResponse(res: any) {
    this.router.navigate(['/home']);
  }

  handleError(error: any) {
    this.error = error.error.error;
  }
}
