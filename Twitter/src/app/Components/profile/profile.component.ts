import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedService } from 'src/app/Services/logged.service';
import { TokenService } from 'src/app/Services/token.service';
import { TweetsService } from 'src/app/Services/tweets.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UsersService } from 'src/app/Services/users.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  showPopup = false;
  public username: any = '';
  userId: any;

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
    private Token: TokenService,
    private userService: UsersService
  ) {}
  public popup = false;
  public tweets: any;
  public user: any;
  public loggedUser: any;
  public viewType = 1;
  public notAUser = false;
  show = false;
  showRetweet =false;
  ngOnInit(): void {
    this.notAUser = false;
    // this.myRoute.params.subscribe((res:any)=>{this.username = res.user});
    this.myRoute.params.subscribe((res: any) => {
      this.username = res.user;
      this.user = null;
      this.userService.index().subscribe({
        next: (data: any) => {
          this.loggedUser = data;
          // this.notAUser = false;
        },
        error: (err) => {
          // this.notAUser=true;
          console.log(err);
        },
      });
      if (this.myRoute.snapshot?.url[1]?.path === 'with_replies') {
        this.show = true;
        // this.showRetweet =false;
        this.notAUser = false;
        this.tweetsClient.getReplies(this.username).subscribe({
          next: (data: any) => {
            this.tweets = data.tweets;
            this.user = data.user;
            console.log(data);

            // console.log(this.tweets);

            // this.notAUser = false;
          },
          error: (err) => {
            this.notAUser = true;
            console.log(err);
          },
        });

      } else if (this.myRoute.snapshot?.url[1]?.path === 'likes') {
        this.show = false;
        // this.showRetweet =false;
        this.notAUser = false;
        this.tweetsClient.getLikes(this.username).subscribe({
          next: (data: any) => {
            this.tweets = data.tweets;
            this.user = data.user;
            // this.notAUser = false;
          },
          error: (err) => {
            this.notAUser = true;
            console.log(err);
          },
        });
      } else if (this.myRoute.snapshot?.url[1]?.path === 'media') {
        this.show = false;
        // this.showRetweet =false;
        this.notAUser = false;
        this.tweetsClient.getMedia(this.username).subscribe({
          next: (data: any) => {
            this.tweets = data.tweets;
            this.user = data.user;
            // this.notAUser = false;
          },
          error: (err) => {
            this.notAUser = true;
            console.log(err);
          },
        });
      } else {
        this.show = false;
        this.showRetweet =true;
        this.notAUser = false;
        this.tweetsClient.getAuthedTweets(this.username).subscribe({
          next: (data: any) => {
            // this.notAUser = false;

            if (this.tweets?.length) {
              // merge arrays
              this.tweets = [...data.tweets, ...this.tweets]
            } else {
              this.tweets = data.tweets;
            }

            // this.tweets = data.tweets;
            this.user = data.user;
            // console.log(this.user);
          },
          error: (err) => {
            this.notAUser = true;
            console.log(err);
          },
        });
        this.tweetsClient.getRetweets(this.username).subscribe({
          next: (data: any) => {
            if (this.tweets?.length) {
              // merge arrays
              this.tweets = [...data.retweets, ...this.tweets]
            } else {
              this.tweets = data.retweets;
            }
            console.log('retweeeets');

            console.log(this.tweets);

            this.user = data.user;
            // this.notAUser = false;
          },
          error: (err) => {
            this.notAUser = true;
            console.log(err);
          },
        });
      }
    });

  }

  follow(id: any) {
    let user_id = +id;

    this.userService.postFollow(user_id).subscribe({
      next: (data) => {},
      error: (err) => {
        console.log(err);
      },
    });
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
