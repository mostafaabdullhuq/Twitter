import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent {
  constructor(
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.user = this.tokenService.getUser();
  }
  protected tweet: any;
  protected tweets: any;
  protected user: any;

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (data: any) => {
        this.user = data;
        console.log(this.user);
      },
      error: (err: any) => {
        this.user = this.tokenService.getUser();
        console.log(err);
      },
    });

    this.userService.getBookmarkedTweets().subscribe({
      next: (data: any) => {
        console.log(data);

        this.tweets = data.tweets;
        this.user = data.user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
