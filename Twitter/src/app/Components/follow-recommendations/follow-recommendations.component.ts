import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow-recommendations',
  templateUrl: './follow-recommendations.component.html',
  styleUrls: ['./follow-recommendations.component.css'],
})
export class FollowRecommendationsComponent implements OnInit {
  constructor(public myService: UsersService, public router: Router) {}
  users: any;
  followings: any;
  ngOnInit(): void {
    this.myService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        err;
      },
    });

    this.myService.getFollowings().subscribe({
      next: (data) => {
        this.followings = data;
      },
      error: (err) => {
        err;
      },
    });
  }

  // Follow = true;
  exit() {
    window.location.reload();
  }

  follow(id: any) {
    let user_id = +id;

    this.myService.postFollow(user_id).subscribe({
      next: (data) => {},
      error: (err) => {
        console.log(err);
      },
    });
  }
  status = false;
  followed() {
    this.status = true;
  }
}
