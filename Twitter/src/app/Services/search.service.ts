import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private BASE_URL = 'http://127.0.0.1:8000/api/search';
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  search(type: any, query: any) {
    let accessToken = this.tokenService.get();
    return this.httpClient.post(
      `${this.BASE_URL}/`,
      {
        type: type,
        query: query,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
}
