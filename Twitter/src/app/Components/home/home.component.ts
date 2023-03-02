import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public tweets: any;
  public user: any;
  public tweetForm = new FormGroup({
    text: new FormControl(null, [Validators.max(1000)]),
    media: new FormControl(null, []),
  });
  public tweetMedia: any = [];
  public currentMediaSrc: any;
  public currentMediaType: any;
  public currentMediaIndex: any = 0;
  public tweetMediaFiles: any = [];
  public tweetMediaTypes: any = [];
  @ViewChild('tweetBox') tweetBox!: ElementRef;

  constructor(
    public myRoute: ActivatedRoute,
    public tweetClient: TweetsService,
    private Token: TokenService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.user = this.Token.getUser();
  }

  ngOnInit(): void {
    if (this.myRoute.snapshot?.url[1]?.path === 'following') {
      this.tweetClient.getFollowingTweets().subscribe({
        next: (data: any) => {
          this.tweets = data;
          this.authService.getUser().subscribe({
            next: (data: any) => {
              this.user = data;
            },
            error: (err: any) => {
              this.user = this.Token.getUser();
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.tweetClient.getForYouTweets().subscribe({
        next: (data: any) => {
          this.tweets = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  tweetSubmit() {
    const media: any = this.tweetForm.value.media ?? null;
    const type: number = 1;
    const text: any = this.tweetForm.value.text ?? null;
    let tweet: any = {};
    if (this.tweetMediaFiles || text) {
      let postData = new FormData();
      Object.keys(this.tweetMediaFiles).forEach((key: any) => {
        postData.append('files[]', this.tweetMediaFiles[key]);
      });
      text ? postData.append('text', text) : false;
      this.tweetClient.createTweet(postData).subscribe({
        next: (data: any) => {
          this.tweets.unshift(data);
          this.tweetForm.reset();
          this.tweetMedia = [];
          this.tweetMediaFiles = [];
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.tweetForm.setErrors({ invalid: true });
    }
  }

  inputChange(data: any) {
    this.tweetMedia = [];
    this.tweetMediaFiles = Array.from(
      data.target.files ? data.target.files : null
    );
    Object.keys(this.tweetMediaFiles).forEach((key: any) => {
      this.tweetMediaTypes.push(
        this.tweetMediaFiles[key].type.split('/')[0] == 'image' ? 1 : 2
      );
      let reader = new FileReader();
      reader.readAsDataURL(this.tweetMediaFiles[key]);
      reader.onload = (e) => {
        this.tweetMedia.push(e.target?.result);
        this.currentMediaSrc = this.tweetMedia[0];
        this.currentMediaType = this.tweetMediaTypes[0];
      };
    });
  }

  handleMedia(type: any) {
    let elementIndex = 0;
    this.tweetMedia.forEach((element: any, index: any) => {
      if (this.currentMediaSrc == element) {
        if (type == 1) {
          elementIndex = index + 1 >= this.tweetMedia.length ? 0 : index + 1;
        } else {
          elementIndex = index - 1 < 0 ? this.tweetMedia.length - 1 : index - 1;
        }
      }
    });
    this.currentMediaSrc = this.tweetMedia[elementIndex];
    this.currentMediaType = this.tweetMediaTypes[elementIndex];
    this.currentMediaIndex = elementIndex;
  }

  removeMedia() {
    this.tweetMedia.splice(this.currentMediaIndex, 1);
    this.tweetMediaTypes.splice(this.currentMediaIndex, 1);
    Object.entries(this.tweetMediaFiles).forEach(([key, value]) => {
      if (key == this.currentMediaIndex) {
        delete this.tweetMediaFiles[key];
      }
    });
    this.tweetMediaFiles = Array.from(this.tweetMediaFiles).filter(
      (item: any) => item != undefined
    );
    this.currentMediaSrc = this.tweetMedia[0];
    this.currentMediaType = this.tweetMediaTypes[0];
    this.currentMediaIndex = 0;
    if (!this.tweetMedia.length) {
      this.tweetForm.patchValue({ media: null });
    }
  }

  formatTweetText(text: any, type = 0): SafeHtml {
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
      if (type == 1) {
        return "<p class='text-gray-500 tracking-tighter text-xl'>What's Happening?</p>";
      }
      return '';
    }
  }
  handleScroll(event: any) {
    // sync the scroll between text area and pre

    this.tweetBox.nativeElement.scrollTop = event.target.scrollTop;
  }
}
