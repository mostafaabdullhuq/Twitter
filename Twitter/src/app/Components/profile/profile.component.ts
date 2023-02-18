import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(myRoute: ActivatedRoute, public httpClient: TweetsService) {}
  public tweets = [];
  ngOnInit(): void {
    this.httpClient.getTweets().subscribe({
      next: (data: any) => {
        this.tweets = data;
        console.log(this.tweets);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
