import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TweetsService } from 'src/app/Services/tweets.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  @Input() showPopup = false;
  @Output() closePopup = new EventEmitter<void>();

  public previewUrl: any;
  public user: any;
  private reader: FileReader = new FileReader();
  private readerCover: FileReader = new FileReader();
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
    profile_picture: '',
    cover_picture: '',
  };

  onSelectFile(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.reader.onload = () => {
        this.form.profile_picture = this.reader.result as string;
        sessionStorage.setItem('profile_picture', this.form.profile_picture);
        const img = document.getElementById(
          'profile-image'
        ) as HTMLImageElement; // get the image element by id
        img.src = this.form.profile_picture; // set the src attribute to the data URL
      };
      this.reader.readAsDataURL(file);
    }
  }

  onSelectCover(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.readerCover.onload = () => {
        this.form.cover_picture = this.readerCover.result as string;
        sessionStorage.setItem('cover_picture', this.form.cover_picture);
        const img = document.getElementById('cover-image') as HTMLImageElement;
        img.src = this.form.cover_picture;
      };
      this.readerCover.readAsDataURL(file);
    }
  }

  clearCoverPicture(): void {
    this.user.cover_picture = '';
    sessionStorage.removeItem('cover_picture');
  }

  constructor(
    public tweetsClient: TweetsService,
    public myActivate: ActivatedRoute,
    private Auth: AuthService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // retrieve the stored file from localStorage
    const storedProfilePicture = sessionStorage.getItem('profile_picture');
    const storedCoverPicture = sessionStorage.getItem('cover_picture');
    // let userName;
    this.authService.getUser().subscribe({
      next: (data: any) => {
        this.user = data;
        // set the value of the input field to the stored file
        this.form = {
          email: this.user.email ?? '',
          first_name: this.user.first_name ?? '',
          last_name: this.user.last_name ?? '',
          username: this.user.username ?? null,
          bio: this.user.bio ?? null,
          date_of_birth: this.user.date_of_birth ?? null,
          phone_number: this.user.phone_number ?? null,
          location: this.user.location ?? null,
          website: this.user.website ?? null,
          profile_picture: storedProfilePicture ?? '',
          cover_picture: storedCoverPicture ?? '',
        };
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    this.Auth.updateUser(this.form).subscribe({
      next: (data) => {
        this.handleResponse(data);
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }
  handleResponse(res: any) {
    this.router.navigate([`/${this.user.username}`]);
  }

  handleError(error: any) {
    this.error = error.error.error;
  }

  onClosePopup() {
    this.closePopup.emit();
  }
}
