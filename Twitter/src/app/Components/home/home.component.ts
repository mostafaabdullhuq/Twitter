import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  public tweetMediaFiles: [] = [];
  @ViewChild('tweetBox') tweetBox!: ElementRef;

  constructor(
    public myRoute: ActivatedRoute,
    public tweetClient: TweetsService,
    private Token: TokenService
  ) {
    this.user = this.Token.getUser();
  }

  ngOnInit(): void {
    if (this.myRoute.snapshot?.url[1]?.path === 'following') {
      this.tweetClient.getFollowingTweets().subscribe({
        next: (data: any) => {
          this.tweets = data;
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

  // ngAfterViewInit(): void {
  //   let tweetBox = this.tweetBox.nativeElement;
  //   tweetBox.addEventListener('input', () => {
  //     console.log('input');
  //   });
  // }

  tweetSubmit() {
    const media: any = this.tweetForm.value.media ?? null;
    const text: any = this.tweetForm.value.text ?? null;
    // let files: any = [];
    let tweet: any = {};
    if (this.tweetMediaFiles || text) {
      let postData = new FormData();
      Object.keys(this.tweetMediaFiles).forEach((key: any) => {
        postData.append('files[]', this.tweetMediaFiles[key]);
        // files.push(postData);
      });
      text ? postData.append('text', text) : false;
      // files.length ? (tweet.files = files) : false;

      // text ? postData.append('text', text) : false;

      this.tweetClient.createTweet(postData).subscribe({
        next: (data: any) => {
          console.log(data);

          // this.tweets.unshift(data);
          // this.tweetForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });

      // console.log(this.tweetMediaFiles);

      // Object.keys(this.tweetMediaFiles).forEach((key: any) => {
      //   console.log(this.tweetMediaFiles[key]);
      //   postData.append('text', text);
      // });
      // console.log(postData);

      // text ? postData.append('text', text) : '';
      // console.log(postData);

      // this.tweetClient.createTweet(tweet).subscribe({
      //   next: (data: any) => {
      //     console.log(data);

      //     this.tweets.unshift(data);
      //     this.tweetForm.reset();
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   },
      // });
    } else {
      this.tweetForm.setErrors({ invalid: true });
    }
  }

  handleEditor(event: any) {
    console.log(event);
  }

  inputChange(data: any) {
    this.tweetMediaFiles = data.target.files ? data.target.files : null;
    Object.keys(this.tweetMediaFiles).forEach((key: any) => {
      let reader = new FileReader();
      reader.readAsDataURL(this.tweetMediaFiles[key]);
      reader.onload = (e) => {
        this.tweetMedia.push(e.target?.result);
      };
    });
  }

  removeMedia() {
    this.tweetMedia = [];
    this.tweetMediaFiles = [];
    this.tweetForm.patchValue({ media: null });
  }
}
