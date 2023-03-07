import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient, public token: TokenService) {}

  private BASE_URL = `${environment.apiURL}/user`;
  index() {
    const accessToken = this.token.get();

    return this.httpClient.get(this.BASE_URL + '/index', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  getAllUsers() {
    const accessToken = this.token.get();

    return this.httpClient.get(this.BASE_URL + '/get-all', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  getAllFollowers() {
    const accessToken = this.token.get();

    return this.httpClient.get(this.BASE_URL + '/get-all-followers', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  getAllFollowings() {
    const accessToken = this.token.get();

    return this.httpClient.get(this.BASE_URL + '/get-all-followings', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  getFollowings() {
    const accessToken = this.token.get();

    return this.httpClient.get(this.BASE_URL + '/get-followings', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  getFollowers() {
    const accessToken = this.token.get();

    return this.httpClient.get(this.BASE_URL + '/get-followers', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  userFollowings(username: any) {
    const accessToken = this.token.get();

    return this.httpClient.get(
      this.BASE_URL + `/${username}/get-a-followings`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
  userFollowers(username: any) {
    const accessToken = this.token.get();

    return this.httpClient.get(this.BASE_URL + `/${username}/get-a-followers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  postFollow(id: number) {
    const accessToken = this.token.get();

    return this.httpClient.post(
      this.BASE_URL + '/follow-unfollow',
      {
        following_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
  deleteUser() {
    const accessToken = this.token.get();

    return this.httpClient.delete(
      this.BASE_URL + '/delete',

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
}
