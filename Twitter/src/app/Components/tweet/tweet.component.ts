// This function formats the text of a tweet by replacing hashtags and mentions with html links
// that can be clicked on. It uses the sanitizer to bypass security restrictions and allows
// the html to be rendered in the tweet component.

import { Component, Input, OnInit ,HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TweetsService } from 'src/app/Services/tweets.service';
import { RouterModule, RouterLink, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    public myRoute: ActivatedRoute,
    public httpClient: TweetsService,
    private authService: AuthService
  ) {}
  public user: any;
  @HostListener('window:scroll', [])
  onScroll(): void {
    console.log("     Increase the view count by one every time the user scrolls");

  }
  ngOnInit(): void {
    this.isInBookmark =
      this.myRoute.snapshot?.url[0]?.path == 'bookmarks' ? true : false;

    this.authService.getUser().subscribe({
      next: (data: any) => {
        console.log(data);

        this.user = data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  likesCount(tweetID: any) {
    this.httpClient.getLikesCount(tweetID).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  formatTweetText(text: string): SafeHtml {
    if (text) {
      const hashtagRegex = /#([\p{Pc}\p{N}\p{L}\p{Mn}]+)/gu;
      const mentionRegex = /@([\p{Pc}\p{N}\p{L}\p{Mn}]+)/gu;
      const hashtagTemplate = '<a routerLink="/hashtag" class="hashtag">$&</a>';
      const mentionTemplate = '<a routerLink="/{{$&}}" class="mention">$&</a>';

      const formattedText = text
        .replace(hashtagRegex, hashtagTemplate)
        .replace(mentionRegex, mentionTemplate);

      return this.sanitizer.bypassSecurityTrustHtml(formattedText);
    } else {
      return '';
    }
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
  // ngOnInit() {
  //   this.isInBookmark =
  // this.myRoute.snapshot?.url[0]?.path == 'bookmarks' ? true : false;
  // }
  popup: boolean = false;
  isInBookmark: boolean = false;

  @Input() tweets: any;
  @Input() showReplies: any;
}
