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
  ngOnInit(): void {
    
    this.myService.getAllUsers().subscribe(
      {
        next:(data)=>{
            this.users = data;
        },
        error:(err)=>{err},
      })
  }
}

