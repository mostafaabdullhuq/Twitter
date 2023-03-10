import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HashtagService } from 'src/app/Services/hashtag.service';
import { SearchService } from 'src/app/Services/search.service';
import { TweetsService } from 'src/app/Services/tweets.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent implements OnInit, AfterViewChecked {
  constructor(
    private hashtagService: HashtagService,
    public myRouter: ActivatedRoute,
    private tweetService: TweetsService,
    private usersService: UsersService,
    private searchService: SearchService
  ) {}
  ngAfterViewChecked(): void {}

  public hashtags: any;
  public tweets: any = null;
  public users: any;
  public isInExplore = true;
  public searchType: any;
  public searchQuery: any;
  public isNoParams: any = false;
  ngOnInit(): void {
    this.myRouter.queryParams.subscribe((queryParams: any) => {
      console.log('here');

      console.log(this.myRouter.snapshot.routeConfig?.path);

      if (
        queryParams.type &&
        queryParams.q &&
        this.myRouter.snapshot.routeConfig?.path == 'search'
      ) {
        this.tweets = null;
        this.users = null;
        this.hashtags = null;
        this.searchType = queryParams['type'] || null;
        let query = queryParams['q'] || null;
        // if in search page with hashtag param
        if (this.searchType && query) {
          this.searchQuery = query;
          this.searchService.search(this.searchType, query).subscribe({
            next: (data: any) => {
              if (this.searchType == 'users') this.users = data?.users;
              else if (this.searchType == 'hashtags') {
                this.hashtags = data;
              } else if (this.searchType == 'tweets') {
                this.tweets = data;
              } else if (this.searchType == 'hashtag_tweets')
                this.tweets = data?.tweets;
              else if (this.searchType == 'user_tweets') this.tweets = data;
            },
            error: (err) => {
              // console.log(err);
            },
          });
        } else {
          // no type or query
        }
        this.isInExplore = false;
      } else {
        this.isNoParams = true;
      }
    });

    let urlpath = this.myRouter.snapshot.routeConfig?.path;

    // if in explore page without any param
    if (urlpath == 'explore') {
      this.isInExplore = true;
      // get trending hashtags
      this.hashtagService.trending(7, 10).subscribe({
        next: (data) => {
          this.hashtags = data;
        },
        error: (err) => {
          // console.log(err);
        },
      });

      // get trending tweets
      this.tweetService.getTrendingTweets(50).subscribe({
        next: (data) => {
          this.tweets = data;
        },
        error: (err) => {
          // console.log(err);
        },
      });

      //get follow recommendations
      this.usersService.getAllUsers().subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (err) => {
          err;
        },
      });
      // if in search page
    } else {
      let params = this.myRouter.snapshot.queryParams;
      this.searchType = params['type'] || null;
      let query = params['q'] || null;
      // if in search page with hashtag param
      if (this.searchType && query) {
        this.searchQuery = query;
        this.searchService.search(this.searchType, query).subscribe({
          next: (data: any) => {
            if (this.searchType == 'users') this.users = data?.users;
            else if (this.searchType == 'hashtags') {
              this.hashtags = data;
            } else if (this.searchType == 'tweets') {
              this.tweets = data;
            } else if (this.searchType == 'hashtag_tweets')
              this.tweets = data?.tweets;
            else if (this.searchType == 'user_tweets') this.tweets = data;
          },
          error: (err) => {
            // console.log(err);
          },
        });
      } else {
        // no type or query
      }
      this.isInExplore = false;
    }
  }

  follow(id: any) {
    let user_id = +id;
    this.usersService.postFollow(user_id).subscribe({
      next: (data) => {},
      error: (err) => {
        // console.log(err);
      },
    });
  }
}
