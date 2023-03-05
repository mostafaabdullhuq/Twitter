import { Component, EventEmitter, Output } from '@angular/core';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UsersService } from 'src/app/Services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedService } from 'src/app/Services/logged.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  showPopup = false;

  constructor(
    public myRoute: ActivatedRoute,
    private Logged: LoggedService,
    private router: Router,
    private Token: TokenService,
    private userService: UsersService
  ) {}

  showChangePassword: boolean = false;
  toggleChangePassword() {
    this.showChangePassword = !this.showChangePassword;
  }
  showAccountInfo: boolean = false;
  toggleAccountInfo() {
    this.showAccountInfo = !this.showAccountInfo;
  }

  @Output() onClose = new EventEmitter();

  closePasswordDialog() {
    this.onClose.emit();
  }

  toggleModal() {
    this.showPopup = true;
  }

  destroy() {
    // event.preventDefault();

    this.userService.deleteUser().subscribe({
      next: (data) => {
        console.log(data);
        this.Token.remove();
        this.Logged.changeAuthStatus(false);
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
