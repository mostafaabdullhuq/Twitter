import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { TweetsService } from 'src/app/Services/tweets.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css'],
})
export class TweetDetailsComponent implements OnInit {
  public tweetID = this.activatedRouter.snapshot.params['id'];

  public replyForm = new FormGroup({
    text: new FormControl(null, [
      Validators.required,
      Validators.maxLength(500),
    ]),
  });
  //reply
  replySubmit() {
    let reply = {
      text: this.replyForm.value.text,
    };
    this.httpClient.createReply(reply, this.tweetID).subscribe({
      next: (data: any) => {
        this.tweet.replies.unshift(data);
        this.tweet.replies_count += 1;
        this.replyForm.reset();
      },
      error: (err) => {
        this.error = err;
      },
    });
  }
  //like
  like: any;
  likesCount() {
    this.httpClient.getLikesCount(this.tweetID).subscribe({
      next: (data: any) => {
        this.tweet.likes_count = data.likes_count;
      },
      error: (err) => {
        this.error = err;
      },
    });
  }
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
