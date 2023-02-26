import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public error: any = null;
  public form = {
  email: null,
  first_name: null,
  last_name: null,
  bio: null,
  date_of_birth: null,
  phone_number: null,
  location: null,
  website: null,
}
  constructor( public tweetsClient: TweetsService,
  public myActivate:ActivatedRoute, 
   private Auth: AuthService,
   private router: Router) {}
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

   onSubmit(){
this.Auth.updateUser(this.form).subscribe({
  next: (data) => {this.handleResponse(data)},
  error: (err) => {this.handleError(err);},
})
 }
 handleResponse(res: any) {
  this.router.navigate(['/profile']);
  
}

handleError(error: any) {
  this.error = error.error.error;
}
}
