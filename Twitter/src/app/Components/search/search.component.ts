import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/Services/search.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';
import { TweetsService } from 'src/app/Services/tweets.service';
import { HashtagService } from 'src/app/Services/hashtag.service';
import { TokenService } from 'src/app/Services/token.service';
import { UserService } from 'src/app/Services/user.service';
import { query } from '@angular/animations';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(
    private httpClient: TweetsService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private tokenService: TokenService,
    private searchService: SearchService,
    private myRouter: Router,
    private authService: AuthService
  ) {
    this.user = this.tokenService.getUser();
    this.authService.getUser().subscribe({
      next: (data: any) => {
        this.user = data;
      },
      error: (err: any) => {
        this.user = this.tokenService.getUser();
      },
    });
  }
  protected user: any;
  isFocused: boolean = false;
  public searchResult: any = null;
  public searchType: any = null;
  public searchQuery: any = null;

  ngOnInit(): void {
    if (this.myRouter.url.split('?')[0] == '/search') {
      this.searchQuery = this.activatedRouter.snapshot.queryParams['q'];
    }
  }

  onChange(event: any): void {
    let value = event.target.value;
    if (
      value &&
      value.replace('#', '').length &&
      value.replace('@', '').length
    ) {
      if (value.startsWith('#')) {
        value = value.replace('#', '');
        this.searchType = 'hashtags';
      } else {
        this.searchType = 'users';
      }
      if (this.searchType == 'hashtags' || this.searchType == 'users') {
        this.searchService.search(this.searchType, value).subscribe({
          next: (data: any) => {
            this.searchResult = data;
          },
          error: (err: any) => {
            // console.log(err);
          },
        });
      }
    } else {
      this.searchResult = null;
    }
  }

  onFocus() {
    this.isFocused = true;
  }
  onBlur(event: any) {
    // if (!event?.relatedTarget?.closest('.search-result')) {
    // }
    setTimeout(() => {
      this.isFocused = false;
    }, 200);
  }

  handleSearchEnter(event: any) {
    this.isFocused = true;
    this.searchQuery = event.target.value;
    event.preventDefault();
    if (event.code == 'NumpadEnter' || event.code == 'Enter') {
      this.isFocused = false;

      if (
        this.searchQuery &&
        this.searchQuery.replace('#', '').length &&
        this.searchQuery.replace('@', '').length
      ) {
        if (this.searchQuery.startsWith('#')) {
          this.myRouter.navigate(['/search'], {
            queryParams: {
              type: 'hashtag_tweets',
              q: this.searchQuery.replace('#', ''),
            },
          });
        } else {
          this.myRouter.navigate(['/search'], {
            queryParams: { type: 'tweets', q: this.searchQuery },
          });
        }
      }
    }
    if (event.code == 'Escape') {
      this.searchResult = null;
      this.isFocused = false;
      event.target.value = '';
    }
  }
}
