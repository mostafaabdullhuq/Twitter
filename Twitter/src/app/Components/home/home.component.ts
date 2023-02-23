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
  public tweets = [];
  public user: any;
  public tweetForm = new FormGroup({
    text: new FormControl(null, [Validators.max(1000)]),
    media: new FormControl(null, []),
  });
  public tweetMedia: any;

  @ViewChild('tweetBox') tweetBox!: ElementRef;

  constructor(
    public myRoute: ActivatedRoute,
    public httpClient: TweetsService,
    private Token: TokenService
  ) {
    this.user = this.Token.getUser();
  }

  ngOnInit(): void {
    if (this.myRoute.snapshot?.url[1]?.path === 'following') {
      this.httpClient.getFollowingTweets().subscribe({
        next: (data: any) => {
          this.tweets = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.httpClient.getForYouTweets().subscribe({
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
    const media = this.tweetForm.value.media;
    const text = this.tweetForm.value.text;
    if (media || text) {
      console.log(this.tweetForm);
    } else {
      this.tweetForm.setErrors({ invalid: true });
    }

    // if (this.tweetForm.valid) {
    //   this.httpClient
    //     .postTweet(this.tweetForm.value.text, this.tweetForm.value.media)
    //     .subscribe({
    //       next: (data: any) => {
    //         this.tweets.unshift(data);
    //         this.tweetForm.reset();
    //       },
    //       error: (err) => {
    //         console.log(err);
    //       },
    //     });
    // }
  }

  handleEditor(event: any) {
    console.log(event);
  }

  inputChange(data: any) {
    let file = data.target.files ? data.target.files[0] : null;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.tweetMedia = e.target?.result;
    };
  }

  removeMedia() {
    this.tweetMedia = null;
  }
}
