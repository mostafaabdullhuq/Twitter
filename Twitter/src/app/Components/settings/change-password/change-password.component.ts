import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public error: any = null;
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
  }
  constructor(public tweetsClient: TweetsService,
    private Auth: AuthService,
    private router: Router)
    {}
    public user: any;

    ngOnInit(): void {
      this.tweetsClient.getAuthedTweets().subscribe({
        next: (data: any) => {
          this.user = data.user;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

  onSubmit(){
    this.Auth.changePasswordSetting(this.form).subscribe({
      next: (data) => {this.handleResponse(data)},
      error: (err) => {this.handleError(err);},
    })
  }
  handleResponse(res: any) {
    this.router.navigate(['/login']);
    
  }
  
  handleError(error: any) {
    this.error = error.error.error;
  }
}
