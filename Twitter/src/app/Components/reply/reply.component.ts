import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { TweetsService } from 'src/app/Services/tweets.service';
import { RouterModule, RouterLink, ActivatedRoute } from '@angular/router';
import { ReplyService } from 'src/app/Services/reply.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css'],
})
export class ReplyComponent {
  constructor(
    public myRoute: ActivatedRoute,
    public httpClient: ReplyService,
    private sanitizer: DomSanitizer
  ) {}

  //like
  // isLiked: boolean = false;
  likesCount(replyID: any) {
    this.httpClient.getLikesCount(replyID).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  @Input() replies: any;
  formatTweetText(text: string): SafeHtml {
    if (text) {
      const hashtagRegex = /#([\p{Pc}\p{N}\p{L}\p{Mn}]+)/gu;
      const mentionRegex = /@([\p{Pc}\p{N}\p{L}\p{Mn}]+)/gu;
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
}
