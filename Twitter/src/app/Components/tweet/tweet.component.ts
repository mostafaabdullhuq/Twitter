// This function formats the text of a tweet by replacing hashtags and mentions with html links
// that can be clicked on. It uses the sanitizer to bypass security restrictions and allows
// the html to be rendered in the tweet component.

import { Component, Input  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { RouterModule , RouterLink } from '@angular/router';
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent {
  constructor(private sanitizer: DomSanitizer ) {}
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

  // likeTweet(tweetId: number) {
  //   this.http.post('/api/like', { tweetId }).subscribe(
  //     (response) => {
  //       console.log('Tweet liked!');
  //     },
  //     (error) => {
  //       console.error('Error liking tweet:', error);
  //     }
  //   );
  // }

  @Input() tweets: any;
}
