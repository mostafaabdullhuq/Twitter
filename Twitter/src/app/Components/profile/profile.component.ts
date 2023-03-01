import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedService } from 'src/app/Services/logged.service';
import { TokenService } from 'src/app/Services/token.service';
import { TweetsService } from 'src/app/Services/tweets.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // showEdit = false;

  // onButtonClick() {
  //   this.showEdit = true;
  //   document.body.classList.add('popup-open');
  // }
  showPopup = false;
  public username: any="";

  onButtonClick() {
    this.showPopup = true;
  }

  onClosePopup() {
    this.showPopup = false;
  }

  constructor(
    public myRoute: ActivatedRoute,
    public tweetsClient: TweetsService,
    private Logged: LoggedService,
    private router: Router,
    private Token: TokenService
  ) {}
  public popup = false;
  public tweets: any;
  public user: any;
  public viewType = 1;
  show= false;
  ngOnInit(): void {
    this.myRoute.params.subscribe((res:any)=>{this.username = res.user});
    if (this.myRoute.snapshot?.url[1]?.path === 'with_replies') {
      this.show = true;
      this.tweetsClient.getReplies(this.username).subscribe({
        next: (data: any) => {
          this.tweets = data.tweets;
          console.log(this.tweets);
          this.user = data.user;

          console.log(this.user);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (this.myRoute.snapshot?.url[1]?.path === 'likes') {
      this.show = false;
      this.tweetsClient.getLikes(this.username).subscribe({
        next: (data: any) => {
          this.tweets = data.tweets;
          console.log(this.tweets);
          this.user = data.user;
          console.log(this.user);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (this.myRoute.snapshot?.url[1]?.path === 'media') {
      this.show = false;
      this.tweetsClient.getMedia(this.username).subscribe({
        next: (data: any) => {
          this.tweets = data.tweets;
          console.log(this.tweets);
          this.user = data.user;
          console.log(this.user);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.show = false;
      // let userName = this.myRoute.snapshot.params['user'];
      this.tweetsClient.getAuthedTweets(this.username).subscribe({
        next: (data: any) => {
          this.tweets = data.tweets;
          this.user = data.user;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.Token.remove();
    this.Logged.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

  logoutPopup() {
    this.popup ? (this.popup = false) : (this.popup = true);
  }
}
