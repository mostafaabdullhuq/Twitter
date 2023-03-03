import { Component , OnInit } from '@angular/core';
import { SearchService } from 'src/app/Services/search.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';
import { TweetsService } from 'src/app/Services/tweets.service';
import { HashtagService } from 'src/app/Services/hashtag.service';
import { TokenService } from 'src/app/Services/token.service';
import { UserService } from 'src/app/Services/user.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(
    private httpClient: TweetsService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private tokenService: TokenService,
    private searchService: SearchService,
  ) {
    this.user = this.tokenService.getUser();
  }
  protected user: any;
  isFocused: boolean = false;
  public searchResult: any = null;
  public searchType: any = null;


  ngOnInit(): void {}

  onChange(event:any) :void {
    let value = event.target.value;
    if (value && value.replace("#","").length){
    if (value.startsWith('#')) {
      value = value.replace('#','');
      this.searchType = 'hashtags';
    }
    else {
      this.searchType = 'users';
    }
    this.searchService.search(this.searchType, value ).subscribe({
      next: (data: any) => {
        this.searchResult = data;
        console.log(data);

      },
      error: (err: any) => {
        console.log(err);

      },
    });
  } else {
    this.searchResult = null;
  }
}

onFocus() {
  this.isFocused = true;
}
onBlur(){
  this.isFocused = false;

}
}
