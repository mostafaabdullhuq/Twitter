import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public myRoute: ActivatedRoute,
    public httpClient: TweetsService,
    private Token: TokenService
  ) {
    this.user = this.Token.getUser();
  }
  public tweets = [];
  public user: any;

  ngOnInit(): void {
    if (this.myRoute.snapshot?.url[1]?.path === 'following') {
      this.httpClient.getFollowingTweets().subscribe({
        next: (data: any) => {
          this.tweets = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.httpClient.getForYouTweets().subscribe({
        next: (data: any) => {
          this.tweets = data;
          console.log(this.tweets);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
