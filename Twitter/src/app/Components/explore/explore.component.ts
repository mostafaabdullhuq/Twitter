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
export class ExploreComponent implements OnInit , AfterViewChecked {
  constructor(
    private hashtagService: HashtagService,
    public myRouter: ActivatedRoute,
    private tweetService: TweetsService,
    private usersService: UsersService,
    private searchService: SearchService
  ) {}
  ngAfterViewChecked(): void {

  }

  public hashtags: any;
  public tweets: any;
  public users: any;
  public isInExplore = true;
  public searchType: any;
  public searchQuery: any;

  ngOnInit(): void {
    console.log('in explore');

    let urlpath = this.myRouter.snapshot.routeConfig?.path?.split('/')[0];

    // if in explore page without any param
    if (urlpath == 'explore') {
      this.isInExplore = true;
      // get trending hashtags
      this.hashtagService.trending(7, 10).subscribe({
        next: (data) => {
          this.hashtags = data;
        },
        error: (err) => {
          console.log(err);
        },
      });

      // get trending tweets
      this.tweetService.getTrendingTweets(50).subscribe({
        next: (data) => {
          this.tweets = data;
        },
        error: (err) => {
          console.log(err);
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
            else if (this.searchType == 'hashtags')
              this.hashtags = data?.hashtags;
            else if (this.searchType == 'tweets') this.tweets = data?.tweets;
            else if (this.searchType == 'hashtag_tweets')
              this.tweets = data?.tweets;
            else if (this.searchType == 'user_tweets')
              this.tweets = data
          },
          error: (err) => {
            console.log(err);
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
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
