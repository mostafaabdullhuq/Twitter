import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private BASE_URL = 'http://127.0.0.1:8000/api/notifications';
  constructor(private http: HttpClient, public token: TokenService) {}


  // getNotifications(): Observable<any[]> {
  //   const accessToken = this.token.get();
  //   return this.http.get<any[]>(this.BASE_URL,{
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  // }


  getNotifications() {
    const accessToken = this.token.get();
    return this.http.get(
      this.BASE_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
  }
}
