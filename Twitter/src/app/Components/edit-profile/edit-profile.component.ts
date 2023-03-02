import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  [x: string]: any;
  @Input('showPopup') showPopup = false;
  @Input('userDetails') user: any;
  @Output() closePopup = new EventEmitter<void>();

  // public user: any;
  public updateForm: any = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        // name validation
        '^[a-zA-Z0-9 -.]*$'
      ),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9 -.]*$'),
    ]),
    username: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        // username validation with maximum 20 char
        '^[a-zA-Z0-9_.]{5,20}$'
      ),
    ]),
    bio: new FormControl(null, [
      Validators.pattern(
        // all unicode characters and limit 250 character
        '^[\\u0000-\\uFFFF]{0,250}$'
      ),
    ]),
    date_of_birth: new FormControl(null, [
      Validators.pattern(
        '^(19|20)\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$'
      ),
    ]),
    phone_number: new FormControl(null, [
      Validators.pattern(
        // phone number validation
        '^[0-9]{5,20}$'
      ),
    ]),
    profile_picture: new FormControl('', []),
    cover_picture: new FormControl('', []),
    location: new FormControl(null, [Validators.pattern('^[a-zA-Z0-9 ,.-]*$')]),
    website: new FormControl(null, [
      Validators.pattern(
        '^(http(s)?:\\/\\/)?((w){3}.)?([a-zA-Z0-9]+).[a-z]+(.[a-z]+)?$'
      ),
    ]),
  });

  public previewUrl: any;
  private profileFile: any;
  private coverFile: any;
  public error: any = null;

  constructor(
    public tweetsClient: TweetsService,
    public myActivate: ActivatedRoute,
    private Auth: AuthService,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    console.log('in edit');
    console.log(this.user);
    // this.updateForm.patchValue(this.user);
    this.updateForm.patchValue({
      is_cover_removed: false,
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      username: this.user.username,
      bio: this.user.bio,
      date_of_birth: this.user.date_of_birth,
      phone_number: this.user.phone_number,
      // profile_picture: this.user.profile_picture,
      // cover_picture: this.user.cover_picture,
      location: this.user.location,
      website: this.user.website,
    });
  }

  onSelectFile(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.profileFile = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.profileFile);
      fileReader.onload = (e) => {
        this.user.profile_picture = e.target?.result;
      };
    }
  }

  onSelectCover(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.updateForm.is_cover_removed = false;
      this.coverFile = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.coverFile);
      fileReader.onload = (e) => {
        this.user.cover_picture = e.target?.result;
      };
    }
  }

  clearCoverPicture(): void {
    this.user.cover_picture = null;
    this.coverFile = null;
    this.updateForm.is_cover_removed = true;
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      console.log('form');

      console.log(this.updateForm);

      console.log('invalid form');

      return;
    }

    let postData = new FormData();
    // append all form data into post data
    for (let key in this.updateForm.value) {
      if (!(key == 'profile_picture' || key == 'cover_picture')) {
        let value = this.updateForm.value[key];
        value ? postData.append(key, value) : null;
      }

      if (key == 'profile_picture') {
        if (this.user.profile_picture && this.profileFile) {
          postData.append(key, this.profileFile);
        }
      }

      if (key == 'cover_picture') {
        if (this.user.cover_picture && this.coverFile) {
          postData.append(key, this.coverFile);
        }
      }
    }

    // get form errors
    this.Auth.updateUser(postData).subscribe({
      next: (data) => {
        this.user = data;
        console.log(this.user);

        this.tokenService.setUser(this.user);
        this.handleResponse(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  handleResponse(res: any) {
    this.onClosePopup();

    // refresh all components

    window.location.href = '/' + this.user.username;
  }

  handleError(error: any) {
    this.error = error.error.error;
  }

  onClosePopup() {
    this.closePopup.emit();
  }
}
