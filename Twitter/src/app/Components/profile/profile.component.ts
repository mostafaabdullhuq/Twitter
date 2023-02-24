import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(public myRoute: ActivatedRoute, public tweetsClient: TweetsService) {}
  public tweets = [];
  public tweetsCount = 0;
  public user: any;
  ngOnInit(): void {
    if (this.myRoute.snapshot?.url[1]?.path === 'with_replies'){
      this.tweetsClient.getAuthedRetweets().subscribe({
        next: (data: any) => {
          this.tweets = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    // else if(this.myRoute.snapshot?.url[1].path === 'likes'){

    // }
    // else if (this.myRoute.snapshot?.url[1].path === 'media'){

    // }
    else{
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

   // showReplies = false;
  // show = false;
  // showTogether()
  // {
  //   this.show = !this.show;
  // }
  // showTweets()
  // {
  //   this.show = !this.show;
  // }
}
