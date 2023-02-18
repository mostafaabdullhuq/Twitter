import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,) { }
 private baseUrl = 'http://127.0.0.1:8000/api/auth';
  signup(data: any){
    return this.http.post(`${this.baseUrl}/signup`, data)
  }
  login(data: any){
    return this.http.post(`${this.baseUrl}/login`, data)

  }
}
