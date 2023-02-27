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
  public currentMediaSrc: any;
  public currentMediaType: any;
  public tweetMediaFiles: any = [];
  public tweetMediaTypes: any = [];
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
    this.tweetMediaFiles = data.target.files ? data.target.files : null;
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
  }

  removeMedia() {
    // this.currentMediaSrc = null;
    // this.currentMediaType = null;
    this.tweetMedia.splice(0, this.currentMediaSrc);
    // this.tweetMedia = [];
    // this.tweetMediaFiles = [];
    // this.tweetForm.patchValue({ media: null });
  }
}
