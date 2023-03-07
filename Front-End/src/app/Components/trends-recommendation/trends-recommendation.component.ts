import { Component, OnInit } from '@angular/core';
import { HashtagService } from 'src/app/Services/hashtag.service';

@Component({
  selector: 'app-trends-recommendation',
  templateUrl: './trends-recommendation.component.html',
  styleUrls: ['./trends-recommendation.component.css'],
})
export class TrendsRecommendationComponent implements OnInit {
  public hashtags: any;

  constructor(private hashtagService: HashtagService) {}

  ngOnInit() {
    this.hashtagService.trending(7, 5).subscribe({
      next: (response) => {
        this.hashtags = response;
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }
}
