import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient, public token: TokenService) { }

  private BASE_URL = 'http://127.0.0.1:8000/api/user';
  // index(){
  //   const accessToken = this.token.get();

  //   return this.httpClient.get(this.BASE_URL +'/index',
  //   {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  // }
  getAllUsers(){
    const accessToken = this.token.get();

    return this.httpClient.get(this.BASE_URL +'/get-all',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }  
  getFollowings(){
    const accessToken = this.token.get();

    return this.httpClient.get(this.BASE_URL +'/get-followings',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }  
  getFollowers(){
    const accessToken = this.token.get();

    return this.httpClient.get(this.BASE_URL +'/get-followers',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }
  postFollow(id:number){
    const accessToken = this.token.get();

    return this.httpClient.post(this.BASE_URL +'/follow-unfollow',
    {
      following_id : id,
    }
    ,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

  }
}
