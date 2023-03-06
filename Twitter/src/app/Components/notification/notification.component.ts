import { NotifyService } from './../../Services/notify.service';
import { Component, OnInit } from '@angular/core';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  public notifications: any[] | undefined;
  constructor(private notifyService: NotifyService) {
    // // console.log("notf");
  }

  ngOnInit(): void {
    this.notifyService.getNotifications().subscribe({
      next: (data: any) => {
        this.notifications = data;
        // // console.log(this.notifications);
      },
      error: (err: any) => {
        // // console.log("in error")
        // console.log(err);
      },
    });
  }
}
