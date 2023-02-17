import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TweetsService {
  private BASE_URL = 'http://localhost:3000/tweets';

  constructor(private httpClient: HttpClient) {}

  getTweets() {
    return this.httpClient.get(this.BASE_URL);
  }

  getTweetById(id: any) {
    return this.httpClient.get(`${this.BASE_URL}/${id}`);
  }

  addTweet(tweet: any) {
    return this.httpClient.post(this.BASE_URL, tweet);
  }

  updateTweet(id: any, newTweet: any) {
    return this.httpClient.put(`${this.BASE_URL}/${id}`, newTweet);
  }

  deleteTweetById(id: any) {
    return this.httpClient.delete(`${this.BASE_URL}/${id}`);
  }

  getTweetsByUserId(id: any) {
    return this.httpClient.get(`${this.BASE_URL}/user/${id}`);
  }

  getTweetsByHashtag(hashtag: any) {
    return this.httpClient.get(`${this.BASE_URL}/hashtag/${hashtag}`);
  }

  getTweetsByMention(mention: any) {
    return this.httpClient.get(`${this.BASE_URL}/mention/${mention}`);
  }

  getTweetsByDate(date: any) {
    return this.httpClient.get(`${this.BASE_URL}/date/${date}`);
  }

  getTweetsByDateRange(startDate: any, endDate: any) {
    return this.httpClient.get(
      `${this.BASE_URL}/daterange/${startDate}/${endDate}`
    );
  }

  getTweetsByHashtagAndDate(hashtag: any, date: any) {
    return this.httpClient.get(
      `${this.BASE_URL}/hashtag/${hashtag}/date/${date}`
    );
  }

  getTweetsByHashtagAndDateRange(hashtag: any, startDate: any, endDate: any) {
    return this.httpClient.get(
      `${this.BASE_URL}/hashtag/${hashtag}/daterange/${startDate}/${endDate}`
    );
  }

  getTweetsByMentionAndDate(mention: any, date: any) {
    return this.httpClient.get(
      `${this.BASE_URL}/mention/${mention}/date/${date}`
    );
  }

  getTweetsByMentionAndDateRange(mention: any, startDate: any, endDate: any) {
    return this.httpClient.get(
      `${this.BASE_URL}/mention/${mention}/daterange/${startDate}/${endDate}`
    );
  }

  getTweetsByHashtagAndMention(hashtag: any, mention: any) {
    return this.httpClient.get(
      `${this.BASE_URL}/hashtag/${hashtag}/mention/${mention}`
    );
  }

  getFollowingUsersTweets(id: any) {
    return this.httpClient.get(`${this.BASE_URL}/following/${id}`);
  }
}
