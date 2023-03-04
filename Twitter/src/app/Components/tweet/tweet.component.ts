// This function formats the text of a tweet by replacing hashtags and mentions with html links
// that can be clicked on. It uses the sanitizer to bypass security restrictions and allows
// the html to be rendered in the tweet component.

import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TweetsService } from 'src/app/Services/tweets.service';
import { RouterModule, RouterLink, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit {
  public user: any;
  public popup: boolean = false;
  public isInBookmark: boolean = false;
  public isInHome: boolean = true;
  // infinite scrolling logic
  public observer: any = new IntersectionObserver((entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        // console.log('new tweet');
      }
    });
  });

  constructor(
    private sanitizer: DomSanitizer,
    public myRoute: ActivatedRoute,
    public httpClient: TweetsService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    let path = this.myRoute.snapshot?.url[0]?.path;
    this.isInBookmark = path == 'bookmarks' ? true : false;

    this.isInHome =
      path == 'home' || !path || path == 'home/following' ? true : false;

    this.authService.getUser().subscribe({
      next: (data: any) => {
        this.user = data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // ngAfterViewChecked(): void {
  //   let lastTweet = document.querySelector('.tweet:last-child');

  //   if (this.myRoute.snapshot?.url[1]?.path === 'following') {
  //     if (lastTweet && this.nextCursor != null) {
  //       this.isLoadingDone = false;

  //       this.observer.observe(lastTweet);
  //     }
  //   } else {
  //     if (lastTweet && this.nextCursor2 != null) {
  //       this.isLoadingDone = false;

  //       this.observer.observe(lastTweet);
  //     }
  //   }
  // }

  likesCount(tweetID: any) {
    this.httpClient.getLikesCount(tweetID).subscribe({
      next: (data: any) => {
        // console.log(data);
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
      const hashtagTemplate = '<a data="$&" class="hashtag">$&</a>';
      const mentionTemplate = '<a data="$&" class="mention">$&</a>';
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
        // console.log(nextIndex);
        container.children[0].children[0].src =
          tweet.media[nextIndex].media_url;

        container.children[0].children[0].src =
          tweet.media[nextIndex].media_url;
      }
    });
  }

  handleTweetPopup(tweet: any) {
    console.log('clicked');

    // this.popup = true;
    this.tweets.forEach((element: any, index: any) => {
      if (element.id != tweet.id) {
        element.isPopupShown = false;
      }
    });
  }

  deleteTweet(tweet: any) {
    this.httpClient.deleteTweetById(tweet.id).subscribe({
      next: (data) => {
        this.tweets = this.tweets.filter((item: any) => item.id != tweet.id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // host listner on scrolling

  @Input() tweets: any;
  @Input() showReplies: any;
  @Input() isLoadingDone: any = true;
  @Input() showRetweets: any;
}
