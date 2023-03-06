import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HashtagService {
  private BASE_URL = `${environment.apiURL}/hashtag`;
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  trending(days: number, count: number) {
    return this.httpClient.post(this.BASE_URL + '/trending', {
      days_count: days,
      hashtags_count: count,
    });
  }

  hashtagTweets(hashtag: string) {
    let accessToken = this.tokenService.get();
    return this.httpClient.get(this.BASE_URL + `/search/${hashtag}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
