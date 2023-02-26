import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class TweetsService {
  private BASE_URL = 'http://127.0.0.1:8000/api/tweet';
  // private Retweet_URL = 'http://127.0.0.1:8000/api';
  constructor(private httpClient: HttpClient, public token: TokenService) {}

export class ReplyService {

  constructor() { }
}
