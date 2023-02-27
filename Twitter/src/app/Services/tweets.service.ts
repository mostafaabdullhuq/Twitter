import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class TweetsService {
  private BASE_URL = 'http://127.0.0.1:8000/api/tweet';
  constructor(private httpClient: HttpClient, public token: TokenService) {}

  getForYouTweets() {
    const accessToken = this.token.get();

    return this.httpClient.get(this.BASE_URL + '/foryou', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  getFollowingTweets() {
    const accessToken = this.token.get();
    return this.httpClient.get(this.BASE_URL + '/following', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  getAuthedTweets() {
    const accessToken = this.token.get();
    return this.httpClient.get(this.BASE_URL + '/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  getTweetById(id: any) {
    const accessToken = this.token.get();

    return this.httpClient.get(`${this.BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  createTweet(tweet: any) {
    const accessToken = this.token.get();

    return this.httpClient.post(this.BASE_URL, tweet, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

//replies
  createReply(reply:any, tweetID:any){
    const accessToken = this.token.get();
    return this.httpClient.post(`${this.BASE_URL}/${tweetID}/reply`,reply, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  //likes
  getLikesCount(id: any){
    const accessToken = this.token.get();
    return this.httpClient.get(`${this.BASE_URL}/${id}/like` ,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

  // getRetweets() {
  //   const accessToken = this.token.get();

  //   return this.httpClient.get(this.Retweet_URL + '/retweets', {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  // }
  // getAuthedRetweets() {
  //   const accessToken = this.token.get();
  //   return this.httpClient.get(this.Retweet_URL + '/retweets', {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  // }

  getReplies() {
    const accessToken = this.token.get();
    return this.httpClient.get(this.BASE_URL + '/replies', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  getLikes(){
    const accessToken = this.token.get();
    return this.httpClient.get(this.BASE_URL + '/likes' ,{
      headers: {
        Authorization :`Bearer ${accessToken}`,
      },
    });
  }
  //Just TEST
  // createLike(like:any, tweetID:any){
  //   const accessToken = this.token.get();
  //   return this.httpClient.post(`${this.BASE_URL}/${tweetID}/like`,like, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  // }
}
