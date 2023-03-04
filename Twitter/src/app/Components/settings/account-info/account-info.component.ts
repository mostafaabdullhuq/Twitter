import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
})
export class AccountInfoComponent implements OnInit {
  @Input('userDetails') user: any;
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
    });
  }
  @Output() closeDialog = new EventEmitter<void>();
  closePasswordDialog() {
    this.closeDialog.emit();
  }
}
