import { Component , OnInit} from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit{
  
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
  follow(id:any){
    let user_id = +id;


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
}
