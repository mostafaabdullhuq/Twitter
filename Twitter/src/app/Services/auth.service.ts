import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  private baseUrl = 'http://127.0.0.1:8000/api/auth';

  signup(data: any) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  public loggedIn$ = new BehaviorSubject<boolean>(false);

  sendPasswordResetLink(data: any) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }

  changePassword(data: any) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data);
  }

  updateUser(data: any) {
    let accessToken = this.tokenService.get();

    // return this.http.post(`${this.baseUrl}/updateUser`, data, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    return this.http.post(`http://127.0.0.1:8000/api/user/update`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  changePasswordSetting(data: any) {
    return this.http.post(`${this.baseUrl}/changePassword`, data);
  }

  getUser() {
    let accessToken = this.tokenService.get();
    return this.http.get(`http://127.0.0.1:8000/api/user/index`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
