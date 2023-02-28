import { Component , OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
import { TokenService } from '../Services/token.service';

@Component({
  selector: 'app-followers-and-following',
  templateUrl: './followers-and-following.component.html',
  styleUrls: ['./followers-and-following.component.css']
})
export class FollowersAndFollowingComponent {
  constructor(public myService:UsersService, public token:TokenService){
  }

  user:any;
  ngOnInit(): void {
    
    this.myService.getFollowers().subscribe(
      {
        next:(data:any)=>{
            this.user = data.user;
            console.log(data.user.id);
        },
        error:(err)=>{err},
      })

      this.myService.getFollowings().subscribe(
        {
          next:(data:any)=>{
              this.user = data.user;
              console.log(data.user.id);
          },
          error:(err)=>{err},
        })
  }
}
