import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  post(arg0: string, arg1: { query: string }) {
    throw new Error('Method not implemented.');
  }
  private BASE_URL = `${environment.apiURL}/api/search`;
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  search(type: any, query: any) {
    let accessToken = this.tokenService.get();
    return this.httpClient.post(
      `${this.BASE_URL}`,
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
