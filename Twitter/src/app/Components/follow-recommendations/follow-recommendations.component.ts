import { Component , OnInit} from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-follow-recommendations',
  templateUrl: './follow-recommendations.component.html',
  styleUrls: ['./follow-recommendations.component.css']
})
export class FollowRecommendationsComponent implements OnInit{
  constructor(public myService:UsersService){}
  users:any;
  followings:any;
  ngOnInit(): void {
    
    this.myService.getAllUsers().subscribe(
      {
        next:(data)=>{
            this.users = data;
        },
        error:(err)=>{err},
      });

    this.myService.getFollowings().subscribe({

        next:(data)=>{
            this.followings = data;
            // console.log(data);
        },
        error:(err)=>{err},
    })

    
  }

  // Follow = true;

  follow(id:any){
    let user_id = +id;

    // this.Follow = false;‏

    this.myService.postFollow(user_id).subscribe(
      {
        next:(data)=>{
          console.log(data);
      },
      error:(err)=>{
        console.log(err);
      },
      }
    )
  }
  status= false;
followed(){
  this.status =true;
}
  // toggleClick(){
  //   let Fol = true;
  // }

//   toggle = true;
// status = 'Enable'; 

// enableDisableRule() {
//     this.toggle = !this.toggle;
//     this.status = this.toggle ? 'Enable' : 'Disable';
// }
// }
}
