import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { TweetsService } from 'src/app/Services/tweets.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-tweet-popup',
  templateUrl: './tweet-popup.component.html',
  styleUrls: ['./tweet-popup.component.css'],
})
export class TweetPopupComponent implements OnInit {
  constructor(
    private httpClient: TweetsService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}

  @Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input('user') user: any;
  @Input('tweet') tweet: any;
  // @Input('isPopupShown') isPopupShown: any;
  @Input('popupType') popupType: any;

  protected error: any;
  protected retweets: any;
  public isRetweetPopupShown = true;

  @ViewChild('tweetBox') tweetBox!: ElementRef;

  //reply
  public retweetForm = new FormGroup({
    text: new FormControl(null, [Validators.maxLength(500)]),
  });

  closePopup() {
    this.isClosed.emit(true);
  }

  replySubmit() {
    // let reply = {
    //   text: this.retweetForm.value.text,
    // };
    // this.httpClient.createReply(reply, this.tweetID).subscribe({
    //   next: (data: any) => {
    //     this.tweet.replies.unshift(data);
    //     this.tweet.replies_count += 1;
    //     this.retweetForm.reset();
    //   },
    //   error: (err) => {
    //     this.error = err;
    //   },
    // });
  }

  shareTweet() {
    let retweetText = this.retweetForm.value.text ?? null;
    this.httpClient.postRetweet(this.tweet?.id, retweetText).subscribe({
      next: (data) => {
        this.tweet = data;
        console.log(this.tweet);
        console.log('Tweet shared successfully');
      },
      error: (err) => {
        this.error = err;
      },
    });
    this.closePopup();
  }

  // handleMedia(type: any, container: any, tweet: any) {
  // let nextIndex;
  // let currentSrc = container.children[0].children[0].src;
  // Object.entries(tweet.media).forEach((value: any, index: any) => {
  //   let mediaObj = value[1];
  //   if (currentSrc === mediaObj.media_url) {
  //     if (type === 1) {
  //       nextIndex = index + 1 >= tweet.media.length ? 0 : index + 1;
  //     } else {
  //       nextIndex = index - 1 < 0 ? tweet.media.length - 1 : index - 1;
  //     }
  //     console.log(nextIndex);
  //     container.children[0].children[0].src =
  //       tweet.media[nextIndex].media_url;
  //     container.children[0].children[0].src =
  //       tweet.media[nextIndex].media_url;
  //   }
  // });
  // }

  ngOnInit(): void {
    console.log(this.tweet);
    console.log(this.user);
    console.log(this.popupType);

    // const tweetID = this.activatedRouter.snapshot.params['id'];
    // this.httpClient.getTweetById(+tweetID).subscribe({
    //   next: (data) => {
    //     this.tweet = data;
    //   },
    //   error: (err) => {
    //     this.error = err;
    //   },
    // });
    // this.httpClient.addView(+tweetID).subscribe({
    //   next: (data) => {
    //     this.tweet = data;
    //   },
    //   error: (err) => {
    //     this.error = err;
    //   },
    // });
  }

  formatTweetText(text: any): SafeHtml {
    if (text) {
      const hashtagRegex = /#([\p{Pc}\p{N}\p{L}\p{Mn}]+)/gu;
      const mentionRegex = /@([\p{Pc}\p{N}\p{L}\p{Mn}]+)/gu;
      const hashtagTemplate = '<a class="hashtag">$&</a>';
      const mentionTemplate = '<a  class="hashtag">$&</a>';
      const formattedText = text
        .replace(hashtagRegex, hashtagTemplate)
        .replace(mentionRegex, mentionTemplate);
      return this.sanitizer.bypassSecurityTrustHtml(formattedText);
    } else {
      if (this.popupType == 1) {
        return "<p class='text-gray-500 tracking-tighter text-xl'>Add your reply.</p>";
      } else {
        return "<p class='text-gray-500 tracking-tighter text-xl'>What's Happening?</p>";
      }
    }
  }

  handleScroll(event: any) {
    // sync the scroll between text area and pre

    this.tweetBox.nativeElement.scrollTop = event.target.scrollTop;
  }

  public tweets: any;
  public tweetMedia: any = [];
  public currentMediaSrc: any;
  public currentMediaType: any;
  public currentMediaIndex: any = 0;
  public tweetMediaFiles: any = [];
  public tweetMediaTypes: any = [];
  public isLoadingDone = true;
  public nextCursor: any = false;
  public nextCursor2: any = false;
  public isCursorLoading: any = false;
  public tweetForm = new FormGroup({
    text: new FormControl(null, [Validators.max(1000)]),
    media: new FormControl(null, []),
  });

  // infinite scrolling logic
  // public observer: any = new IntersectionObserver((entries: any) => {
  //   entries.forEach((entry: any) => {
  //     if (entry.isIntersecting) {
  //       if (this.myRoute.snapshot?.url[1]?.path === 'following') {
  //         this.tweetClient.getFollowingTweets(this.nextCursor).subscribe({
  //           next: (data: any) => {
  //             this.tweets = this.tweets.concat(data.tweets);
  //             this.nextCursor = data.nextCursor;
  //             if (data.nextCursor == null) {
  //               this.observer.disconnect();
  //               this.isLoadingDone = true;
  //             }
  //           },
  //           error: (err) => {
  //             console.log(err);
  //           },
  //         });
  //       } else {
  //         this.tweetClient.getForYouTweets(this.nextCursor2).subscribe({
  //           next: (data: any) => {
  //             this.tweets = this.tweets.concat(data.tweets);
  //             this.nextCursor2 = data.nextCursor;
  //             if (data.nextCursor2 == null) {
  //               this.isLoadingDone = true;

  //               this.observer.disconnect();
  //             }
  //           },
  //           error: (err) => {
  //             console.log(err);
  //           },
  //         });
  //       }
  //     }
  //   });
  // });

  ngAfterViewChecked(): void {
    // let lastTweet = document.querySelector('.tweet:last-child');
    // if (this.myRoute.snapshot?.url[1]?.path === 'following') {
    //   if (lastTweet && this.nextCursor != null) {
    //     this.isLoadingDone = false;
    //     this.observer.observe(lastTweet);
    //   }
    // } else {
    //   if (lastTweet && this.nextCursor2 != null) {
    //     this.isLoadingDone = false;
    //     this.observer.observe(lastTweet);
    //   }
    // }
  }

  // ngOnInit(): void {
  //   if (this.myRoute.snapshot?.url[1]?.path === 'following') {
  //     this.tweetClient.getFollowingTweets(this.nextCursor).subscribe({
  //       next: (data: any) => {
  //         this.tweets = data.tweets;
  //         this.nextCursor = data.nextCursor;
  //         this.authService.getUser().subscribe({
  //           next: (data: any) => {
  //             this.user = data;
  //           },
  //           error: (err: any) => {
  //             this.user = this.Token.getUser();
  //           },
  //         });
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  //   } else {
  //     this.tweetClient.getForYouTweets(this.nextCursor2).subscribe({
  //       next: (data: any) => {
  //         this.tweets = data.tweets;
  //         this.nextCursor2 = data.nextCursor;
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  //   }
  // }

  tweetSubmit() {
    // const media: any = this.tweetForm.value.media ?? null;
    // const type: number = 1;
    // const text: any = this.tweetForm.value.text ?? null;
    // let tweet: any = {};
    // if (this.tweetMediaFiles || text) {
    //   let postData = new FormData();
    //   Object.keys(this.tweetMediaFiles).forEach((key: any) => {
    //     postData.append('files[]', this.tweetMediaFiles[key]);
    //   });
    //   text ? postData.append('text', text) : false;
    //   this.tweetClient.createTweet(postData).subscribe({
    //     next: (data: any) => {
    //       this.tweets.unshift(data);
    //       this.tweetForm.reset();
    //       this.tweetMedia = [];
    //       this.tweetMediaFiles = [];
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
    // } else {
    //   this.tweetForm.setErrors({ invalid: true });
    // }
  }

  inputChange(data: any) {
    // this.tweetMedia = [];
    // this.tweetMediaFiles = Array.from(
    //   data.target.files ? data.target.files : null
    // );
    // Object.keys(this.tweetMediaFiles).forEach((key: any) => {
    //   this.tweetMediaTypes.push(
    //     this.tweetMediaFiles[key].type.split('/')[0] == 'image' ? 1 : 2
    //   );
    //   let reader = new FileReader();
    //   reader.readAsDataURL(this.tweetMediaFiles[key]);
    //   reader.onload = (e) => {
    //     this.tweetMedia.push(e.target?.result);
    //     this.currentMediaSrc = this.tweetMedia[0];
    //     this.currentMediaType = this.tweetMediaTypes[0];
    //   };
    // });
  }

  handleMedia(type: any) {
    //   let elementIndex = 0;
    //   this.tweetMedia.forEach((element: any, index: any) => {
    //     if (this.currentMediaSrc == element) {
    //       if (type == 1) {
    //         elementIndex = index + 1 >= this.tweetMedia.length ? 0 : index + 1;
    //       } else {
    //         elementIndex = index - 1 < 0 ? this.tweetMedia.length - 1 : index - 1;
    //       }
    //     }
    //   });
    //   this.currentMediaSrc = this.tweetMedia[elementIndex];
    //   this.currentMediaType = this.tweetMediaTypes[elementIndex];
    //   this.currentMediaIndex = elementIndex;
  }

  removeMedia() {
    // this.tweetMedia.splice(this.currentMediaIndex, 1);
    // this.tweetMediaTypes.splice(this.currentMediaIndex, 1);
    // Object.entries(this.tweetMediaFiles).forEach(([key, value]) => {
    //   if (key == this.currentMediaIndex) {
    //     delete this.tweetMediaFiles[key];
    //   }
    // });
    // this.tweetMediaFiles = Array.from(this.tweetMediaFiles).filter(
    //   (item: any) => item != undefined
    // );
    // this.currentMediaSrc = this.tweetMedia[0];
    // this.currentMediaType = this.tweetMediaTypes[0];
    // this.currentMediaIndex = 0;
    // if (!this.tweetMedia.length) {
    //   this.tweetForm.patchValue({ media: null });
    // }
  }
}
