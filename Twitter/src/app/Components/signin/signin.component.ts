import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { LoggedService } from 'src/app/Services/logged.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  public form = {
    email: null,
    password: null
  };
  public error:any = null;
  

  constructor(
    private Auth: AuthService,
    private Token: TokenService,
    private router: Router,
    private Logged: LoggedService,

    ) { }

  onSubmit() {
    this.Auth.login(this.form).subscribe({
      next: (data) => { this.handelResponse(data) },
      error: (err) => { this.handleError(err) },
    });
  }

  handelResponse(data:any){
   this.Token.handel(data.access_token);
   this.Logged.changeAuthStatus(true);
   this.router.navigateByUrl('/home');
  }

  handleError(error:any) {
    this.error = error.error.error;
  }

  ngOnInit() {
  }
}
