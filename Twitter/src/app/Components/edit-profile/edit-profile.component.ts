import { Component, OnInit } from '@angular/core';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  constructor( public tweetsClient: TweetsService) {}
  public user: any;
  ngOnInit(): void {
    this.tweetsClient.getAuthedTweets().subscribe({
      next: (data: any) => {
        this.user = data.user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
