// This function formats the text of a tweet by replacing hashtags and mentions with html links
// that can be clicked on. It uses the sanitizer to bypass security restrictions and allows
// the html to be rendered in the tweet component.

import { Component, Input  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TweetsService } from 'src/app/Services/tweets.service';
import { RouterModule , RouterLink, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent {
  constructor(private sanitizer: DomSanitizer
    ,public myRoute: ActivatedRoute,
     public httpClient:TweetsService,) {}
  formatTweetText(text: string): SafeHtml {
    const hashtagRegex = /#[a-zA-Z0-9_]+/g;
    const mentionRegex = /@[a-zA-Z0-9_]+/g;
    const hashtagTemplate = '<a href="#" class="hashtag">$&</a>';
    const mentionTemplate = '<a href="#" class="hashtag">$&</a>';

    const formattedText = text
      .replace(hashtagRegex, hashtagTemplate)
      .replace(mentionRegex, mentionTemplate);

    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }

  likesCount(tweetID:any){
    this.httpClient.getLikesCount(tweetID ).subscribe({
      next: (data:any) => {
        console.log(data);
        console.log("liked a tweet from home component");

        // this.tweet.likes_count = data.likes_count ;
      },
      error: (err) => {
        console.log(err);

      },
    });
  }

  @Input() tweets: any;
}


