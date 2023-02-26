import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
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
  @Input() replies: any;
}
