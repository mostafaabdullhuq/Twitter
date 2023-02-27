import { Component, EventEmitter, Output } from '@angular/core';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  showChangePassword = false;
  onButtonClick() {
    this.showChangePassword = true;
  }
}
