import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent {
  constructor(
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
  ){
    this.user = this.tokenService.getUser();
  }
  protected tweet: any;
  protected tweets:any;
  protected user: any;

  ngOnInit(): void {
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
