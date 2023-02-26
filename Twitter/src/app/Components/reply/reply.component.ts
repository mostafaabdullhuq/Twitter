import { Component, Input } from '@angular/core';
import { TweetsService } from 'src/app/Services/tweets.service';
import { RouterModule , RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css'],
})
export class ReplyComponent {
  constructor(
    public myRoute: ActivatedRoute,
     public httpClient:TweetsService,) {}

     likesCount(tweetID:any){
      this.httpClient.getLikesCount( tweetID ).subscribe({
        next: (data:any) => {
          console.log(data);
          console.log("liked a reply");

        },
        error: (err) => {
          console.log(err);

        },
      });
    }
  @Input() replies: any;
}
