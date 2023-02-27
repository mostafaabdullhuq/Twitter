import { Component, Input } from '@angular/core';
// import { TweetsService } from 'src/app/Services/tweets.service';
import { RouterModule , RouterLink, ActivatedRoute } from '@angular/router';
import { ReplyService } from 'src/app/Services/reply.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css'],
})
export class ReplyComponent {
  constructor(
    public myRoute: ActivatedRoute,
     public httpClient:ReplyService,) {}

     //like
  // isLiked: boolean = false;
     likesCount(replyID:any){
      this.httpClient.getLikesCount( replyID ).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    
  @Input() replies: any;
}
