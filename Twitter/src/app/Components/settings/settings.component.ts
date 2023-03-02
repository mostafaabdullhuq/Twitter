import { Component, EventEmitter, Output } from '@angular/core';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
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
}
