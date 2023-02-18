import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent {
  constructor(private sanitizer: DomSanitizer) {}
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

  @Input() tweets: any;
}
