import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // constructor(@Inject(AuthService) private authService: AuthService) {}

  isLoggedIn: boolean = true;

  title = 'Twitter';
}
