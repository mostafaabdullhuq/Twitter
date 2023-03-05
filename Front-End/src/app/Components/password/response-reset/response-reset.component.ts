import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  public error: any = null;
    public form = {
    email: null,
    password: null,
    password_confirmation: null,
  }
constructor(private route: ActivatedRoute,
  private Auth: AuthService,
  private router: Router)
  {}

  ngOnInit(): void {
  }

 onSubmit(){
this.Auth.changePassword(this.form).subscribe({
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
