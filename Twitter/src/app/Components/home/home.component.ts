import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(myRoute: ActivatedRoute, public httpClient: TweetsService) {}
  public tweets = [];
  ngOnInit(): void {
    this.httpClient.getTweets().subscribe({
      next: (data: any) => {
        this.tweets = data.data;
        console.log(this.tweets);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
