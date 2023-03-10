import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private iss = {
    login: `${environment.apiURL}/auth/login`,
    signup: `${environment.apiURL}/auth/signup`,
  };
  constructor() {}
  handel(token: any) {
    this.set(token);
    //  // console.log(this.isValid());
  }

  set(token: any) {
    sessionStorage.setItem('token', token);
  }

  get() {
    return sessionStorage.getItem('token');
  }

  setUser(user: {}) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('user')?.toString() || '{}');
  }

  remove() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
  // check token and return true or false
  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token: any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: any) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
