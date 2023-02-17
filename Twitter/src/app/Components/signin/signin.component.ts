import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
    private http: HttpClient,
  ) { }
  onSubmit() {
   return this.http.post('http://127.0.0.1:8000/api/auth/login', this.form)
    .subscribe({
      next: (data) => { console.log(data) },
      error: (err) => { this.handleError(err) },
    });

  }
  
  handleError(error:any) {
    this.error = error.error.error;
  }
  ngOnInit() {
  }
}
