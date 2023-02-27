import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { TweetsService } from 'src/app/Services/tweets.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
    private tokenService: TokenService,
    private sanitizer: DomSanitizer
  ) {
    this.user = this.tokenService.getUser();
  }
  protected tweet: any;
  protected error: any;
  protected user: any;
  public tweetID = this.activatedRouter.snapshot.params['id'];
  public showControls = false;

  //reply
  public replyForm = new FormGroup({
    text: new FormControl(null, [
      Validators.required,
      Validators.maxLength(500),
    ]),
  });

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

  handleMedia(type: any, container: any, tweet: any) {
    let nextIndex;
    let currentSrc = container.children[0].children[0].src;
    Object.entries(tweet.media).forEach((value: any, index: any) => {
      let mediaObj = value[1];
      if (currentSrc === mediaObj.media_url) {
        if (type === 1) {
          nextIndex = index + 1 >= tweet.media.length ? 0 : index + 1;
        } else {
          nextIndex = index - 1 < 0 ? tweet.media.length - 1 : index - 1;
        }
        console.log(nextIndex);
        container.children[0].children[0].src =
          tweet.media[nextIndex].media_url;

        container.children[0].children[0].src =
          tweet.media[nextIndex].media_url;
      }
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

  deleteTweet() {
    this.httpClient.deleteTweetById(this.tweet.id).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  bookmarkToggle(tweetID: any) {
    // this.httpClient.bookmarkToggle(tweetID).subscribe({
    //   next: (data) => {
    //     this.tweet = data;
    //   },
    //   error: (err) => {
    //     this.error = err;
    //   },
    // });
  }
}
