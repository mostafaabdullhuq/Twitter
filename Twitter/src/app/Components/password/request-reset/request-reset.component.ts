import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css'],
})
export class RequestResetComponent implements OnInit {
  public form = {
    email: null,
 }
 public error:any = null;
 constructor(private Auth: AuthService,
  private router: Router) { }
 

ngOnInit(): void {
}

onSubmit(){
    this.Auth.sendPasswordResetLink(this.form).subscribe({
      next: (data) => {this.handleResponse(data)},
      error: (error) => {this.handleError(error)},
    });
 }


  handleResponse(res: any) {
    // this.form.email = null;
    this.router.navigate(['/confirm']);
  }

  handleError(error: any) {
    this.error = error.error.error;
  }

}
