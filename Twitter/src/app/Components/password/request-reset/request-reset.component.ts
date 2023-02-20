import { Component, OnInit } from '@angular/core';
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
 constructor(private Auth: AuthService,) { }
 

ngOnInit(): void {
}

onSubmit(){
    this.Auth.sendPasswordResetLink(this.form).subscribe({
      next: (data) => {this.handleResponse(data)},
      error: (error) => {console.log(error)},
    });
 }


  handleResponse(res: any) {
    this.form.email = null;
  }
}
