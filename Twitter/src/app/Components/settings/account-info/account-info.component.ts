import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
})
export class AccountInfoComponent implements OnInit {
  @Input('userDetails') user: any;
  constructor(private auth: AuthService, private token: TokenService) {}
  ngOnInit(): void {
    this.user = this.token.getUser();
    this.auth.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        this.token.getUser();
      },
    });
  }
  @Output() closeDialog = new EventEmitter<void>();
  closePasswordDialog() {
    this.closeDialog.emit();
  }
}
