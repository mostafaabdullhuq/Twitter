import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input() showPopup = false;
  @Output() closePopup = new EventEmitter<void>();

  onClosePopup() {
    this.closePopup.emit();
  }
  
  // showEdit = true;
  //   hidePopup() {
  //   this.showEdit = false;
  //   document.body.classList.remove('popup-open');
  // }
  
  public error: any = null;
  public form = {
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    bio: '',
    date_of_birth: '',
    phone_number: '',
    location: '',
    website: '',
  };
  
  constructor( public tweetsClient: TweetsService,
  public myActivate:ActivatedRoute, 
   private Auth: AuthService,
   private router: Router) {}
  public user: any;

  ngOnInit(): void {
    this.tweetsClient.getAuthedTweets().subscribe({
      next: (data: any) => {
        this.user = data.user;
        this.form = {
          email: this.user.email || '',
          first_name:this.user.first_name || '',
          last_name: this.user.last_name || '',
          username: this.user.username || null,
          bio: this.user.bio || null,
          date_of_birth: this.user.date_of_birth || null,
          phone_number: this.user.phone_number || null,
          location: this.user.location || null,
          website: this.user.website || null,
        };
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
