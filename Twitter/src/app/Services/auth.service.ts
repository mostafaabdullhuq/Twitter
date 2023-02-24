import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
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

  updateUser(id: any, user: any) {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }
  
}
