import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HashtagService } from 'src/app/Services/hashtag.service';
import { TweetsService } from 'src/app/Services/tweets.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent implements OnInit {
  constructor(
    private hashtagService: HashtagService,
    public myRouter: ActivatedRoute,
    private tweetService: TweetsService,
    private usersService: UsersService
    
  ) {}

  public hashtags: any;
  public tweets: any;
  public users: any;
  
  ngOnInit(): void {
    // if in explore page without any param
    if (!Object.keys(this.myRouter.snapshot.params).length) {
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
          console.log('tweets');

          console.log(this.tweets);
        },
        error: (err) => {
          console.log(err);
        },
      });

      //get follow recommendations
      this.usersService.getAllUsers().subscribe(
        {
          next:(data)=>{
              this.users = data;
          },
          error:(err)=>{err},
        });
    }
  }
  follow(id:any){
    let user_id = +id;

    this.usersService.postFollow(user_id).subscribe(
      {
        next:(data)=>{
          console.log(data);
      },
      error:(err)=>{
        console.log(err);
      },
      }
    )
  }
}
