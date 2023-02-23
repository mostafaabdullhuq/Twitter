import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(myRoute: ActivatedRoute, public tweetsClient: TweetsService) {}
  public tweets: any;
  public tweetsCount = 0;
  public user: any;
  ngOnInit(): void {
    this.tweetsClient.getAuthedTweets().subscribe({
      next: (data: any) => {
        this.tweets = data.tweets;
        this.user = data.user;
        this.tweetsCount = this.tweets.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
