import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReplyService {
  private BASE_URL = `${environment.apiURL}/reply`;
  constructor(private httpClient: HttpClient, public token: TokenService) {}

  getLikesCount(replyID: any) {
    const accessToken = this.token.get();
    return this.httpClient.get(`${this.BASE_URL}/${replyID}/like`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
