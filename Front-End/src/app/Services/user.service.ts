import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL = `${environment.apiURL}/user`;
  constructor(private httpClient: HttpClient, public token: TokenService) {}

  getBookmarkedTweets() {
    const accessToken = this.token.get();
    return this.httpClient.get(`${this.BASE_URL}/bookmarks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  createBokkmarks(tweetID: any) {
    const accessToken = this.token.get();
    return this.httpClient.post(
      `${this.BASE_URL}/bookmarks/create`,
      { tweet_id: tweetID },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
  deleteBookmarked(id: any) {
    const accessToken = this.token.get();
    return this.httpClient.delete(`${this.BASE_URL}/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
