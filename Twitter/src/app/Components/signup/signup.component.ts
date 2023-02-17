import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    username: null,
    gender: null,
    phone_number: null,
    date_of_birth: null,
    // month: null,
    // day: null,
    // year: null
  };
  public error: any= [];
  constructor(
    private http: HttpClient,
  ) { }
  onSubmit(){
    return this.http.post('http://127.0.0.1:8000/api/auth/signup', this.form)
    .subscribe({
      next: (data) => { console.log(data) },
      error: (err) => { this.handleError(err)},
    });
  }
  handleError(error:any) {
    this.error = error.error.errors;
  }
  ngOnInit(): void {
  }
}
