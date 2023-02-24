import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor( public tweetsClient: TweetsService,
    public myActivate:ActivatedRoute, public myservice:AuthService) {}
  public user: any;
  ngOnInit(): void {
    this.tweetsClient.getAuthedTweets().subscribe({
      next: (data: any) => {
        this.user = data.user;
        console.log(this.user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // updateUser(){
  // this.myservice.updateUser(this.id,this.user).subscribe({});
  // }
}
