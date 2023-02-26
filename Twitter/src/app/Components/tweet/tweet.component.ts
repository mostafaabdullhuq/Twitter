// This function formats the text of a tweet by replacing hashtags and mentions with html links
// that can be clicked on. It uses the sanitizer to bypass security restrictions and allows
// the html to be rendered in the tweet component.

import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TweetsService } from 'src/app/Services/tweets.service';
import { RouterModule , RouterLink, ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit {
  // public tweetID = this.activatedRouter.snapshot.params['id'];
  constructor(
    private httpClient: TweetsService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private sanitizer: DomSanitizer,
  ) {
    this.user = this.tokenService.getUser();
  }
  protected tweet: any;
  protected error: any;
  protected user: any;
  formatTweetText(text: string): SafeHtml {
    if (text) {
      const hashtagRegex = /#[a-zA-Z0-9_]+/g;
      const mentionRegex = /@[a-zA-Z0-9_]+/g;
      const hashtagTemplate = '<a href="#" class="hashtag">$&</a>';
      const mentionTemplate = '<a href="#" class="hashtag">$&</a>';

      const formattedText = text
        .replace(hashtagRegex, hashtagTemplate)
        .replace(mentionRegex, mentionTemplate);

      return this.sanitizer.bypassSecurityTrustHtml(formattedText);
    } else {
      return '';
    }
  }


  //like
  isLiked: boolean = false;
  // public tweetID = this.activatedRouter.snapshot.params['id'];
 likesCount(tweet: any) {
  console.log(tweet.id);

  this.httpClient.getLikesCount(tweet.id).subscribe({
    next: (data: any) => {
      this.isLiked = data.likes_count >= 1;
      // this.isLiked = !this.isLiked;
      console.log("liked a tweet from home component");
    },
    error: (err) => {
      console.log(err);
    },
  });
}


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
  @Input() tweets: any;
}


// constructor(private sanitizer: DomSanitizer,
//    public myRoute: ActivatedRoute,
//    public httpClient:TweetsService,
//    private activatedRouter: ActivatedRoute,
//    ) {}
