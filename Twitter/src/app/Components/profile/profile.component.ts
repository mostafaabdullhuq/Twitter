import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    public myRoute: ActivatedRoute,
    public tweetsClient: TweetsService
  ) {}
  public tweets: any;
  public tweetsCount = 0;
  public user: any;
  public viewType = 1;
  ngOnInit(): void {
    if (this.myRoute.snapshot?.url[1]?.path === 'with_replies') {
      this.tweetsClient.getReplies().subscribe({
        next: (data: any) => {
          this.tweets = data.tweets;
          console.log(this.tweets);

          this.user = data.user;
          console.log(this.user);

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
    else {
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

  // if (this.myRoute.snapshot?.url[1]?.path === 'retweets'){
  //   this.tweetsClient.getAuthedRetweets().subscribe({
  //     next: (data: any) => {
  //       this.tweets = data;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
