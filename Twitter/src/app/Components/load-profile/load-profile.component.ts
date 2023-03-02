// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedService } from 'src/app/Services/logged.service';
import { TokenService } from 'src/app/Services/token.service';
import { TweetsService } from 'src/app/Services/tweets.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UsersService } from 'src/app/Services/users.service';
@Component({
  selector: 'app-load-profile',
  templateUrl: './load-profile.component.html',
  styleUrls: ['./load-profile.component.css']
})
export class LoadProfileComponent implements OnInit {
  public username: any = '';
  constructor(
    public myRoute: ActivatedRoute,
    public tweetsClient: TweetsService,
    private Logged: LoggedService,
    private router: Router,
    private Token: TokenService,
    private userService: UsersService
  ) {}
  public user: any;
  ngOnInit(): void {
  this.myRoute.params.subscribe((res:any)=>{this.username = res.user});
  }
}
