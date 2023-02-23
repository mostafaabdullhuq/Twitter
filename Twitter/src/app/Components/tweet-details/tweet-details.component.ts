import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css'],
})
export class TweetDetailsComponent implements OnInit {
  constructor(
    private httpClient: TweetsService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.user = this.tokenService.getUser();
  }

  protected tweet: any;
  protected error: any;
  protected user: any;

  ngOnInit(): void {
    const tweetID = this.activatedRouter.snapshot.params['id'];
    this.httpClient.getTweetById(+tweetID).subscribe({
      next: (data) => {
        this.tweet = data;
      },
      error: (err) => {
        this.error = err;
      },
    });
  }
}
