import { Component } from '@angular/core';
// import { AuthService } from './Services/auth.service';
// import { Injectable, Inject } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // constructor(@Inject(AuthService) private authService: AuthService) {}

  // isLoggedIn: boolean = false;

  // // constructor(private authService: AuthService) {}

  // ngOnInit() {
  //   this.authService.loggedIn$.subscribe(loggedIn => {
  //     this.isLoggedIn = loggedIn;
  //   });
  // }
  title = 'Twitter';
  public isLoggedin = false;
}
