import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
import { TokenService } from '../Services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-followers-and-following',
  templateUrl: './followers-and-following.component.html',
  styleUrls: ['./followers-and-following.component.css'],
})
export class FollowersAndFollowingComponent {
  constructor(
    public myService: UsersService,
    public token: TokenService,
    public myRoute: ActivatedRoute,
    public tweetsClient: TweetsService
  ) {}
  followers: any;
  followings: any;
  user: any;
  userId: any;
  username: any;

  ngOnInit(): void {
    this.myRoute.params.subscribe((res: any) => {
      this.username = res.user;
    });
    // // console.log(this.username);

    // this.tweetsClient.getReplies(this.username).subscribe({
    //   next: (data: any) => {
    //     // this.tweets = data.tweets;
    //     this.userId = data.user.id;
    //     this.user = data.user;
    //     // console.log(this.username);
    //   },
    //   error: (err) => {
    //     // console.log(err);
    //   },
    // });

    if (this.myRoute.snapshot?.url[1]?.path === 'following') {
      this.myService.userFollowings(this.username).subscribe({
        next: (data: any) => {
          this.followings = data.followList;
          this.user = data.user;

          // // console.log('followings : ');
          // // console.log(this.followings);
        },
        error: (err) => {
          err;
        },
      });
    } else if (this.myRoute.snapshot?.url[1]?.path === 'followers') {
      this.myService.userFollowers(this.username).subscribe({
        next: (data: any) => {
          this.followings = data.followList;
          this.user = data.user;

          // // console.log('followings : ');
          // // console.log(this.followings);
        },
        error: (err) => {
          err;
        },
      });
    }

    // this.myService.getFollowers().subscribe(
    //   {
    //     next:(data:any)=>{
    //         this.user = data.user;
    //         // console.log(data.user.id);
    //     },
    //     error:(err)=>{err},
    //   })

    // this.myService.getFollowings().subscribe(
    //   {
    //     next:(data:any)=>{
    //         this.user = data.user;
    //         // console.log(data.user.id);
    //     },
    //     error:(err)=>{err},
    //   })
  }
  follow(id: any) {
    let user_id = +id;

    this.myService.postFollow(user_id).subscribe({
      next: (data: any) => {
        // // console.log(data);
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
}
