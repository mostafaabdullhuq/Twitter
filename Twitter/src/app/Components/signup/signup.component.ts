import { AuthService } from './../../Services/auth.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public isDiv1Visible = true;

  public form = {
    email: null,
    first_name: null,
    last_name: null,
    password: null,
    password_confirmation: null,
  };
  public error: any= [];
  constructor(private Auth: AuthService,
    private Token: TokenService,
    private router: Router,

    ) { }
  onSubmit(){
    this.Auth.signup(this.form).subscribe({
      next: (data) => { this.handelResponse(data) },
      error: (err) => { this.handleError(err)},
    });
  }
  handelResponse(data:any){
    this.Token.handel(data.access_token);
    this.router.navigateByUrl('/explore');
   }

  handleError(error:any) {
    this.error = error.error.errors;
  }
  ngOnInit(): void {
  }

  // close(): void {
  //   this.dialogRef.close();
  // }
}
