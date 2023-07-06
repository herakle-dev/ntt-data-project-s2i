import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Location, LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GetAllService } from 'src/app/shared/services/get-all.service';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private headers = this.userService.headers;
  private url = this.userService.allUsersUrl; //https://gorest.co.in/public/v2/users

  constructor(
    private userService: UserService,
    public recursiveGetService: GetAllService,
    private location: Location,
    private locationStrategy: LocationStrategy,
    private http: HttpClient
  ) {}

   getCurrentUserId(): string {
    const currentUrl = this.locationStrategy.path();
    const pathArray = currentUrl.split('/');
    return pathArray[2];
  }

  public postUrl: string;
  public postPerPage = 100;

  getUserDetail(): Observable<any> {
    const userId = this.getCurrentUserId();
    return this.http.get(`${this.url}/${userId}`, { headers: this.headers });
  }

  getAllUserPost(): Observable<any[]> {
    const userId = this.getCurrentUserId();
    const postUrl = `${this.url}/${userId}/posts`;
    return this.recursiveGetService.getAllInApi(this.postPerPage, postUrl).pipe(
      map((pages: any[][]) => {
        const allPosts = pages.reduce((accumulator, page) => accumulator.concat(page), []);
        return allPosts;
      })
    );
  }

  getAllUserComments(postId: number): Observable<any[]> {
    const commentsUrl = `https://gorest.co.in/public/v2/posts/${postId}/comments`;
    return this.recursiveGetService.getAllInApi(this.postPerPage, commentsUrl).pipe(
      map((pages: any[][]) => {
        const allComments = pages.reduce((accumulator, page) => accumulator.concat(page), []);
        return allComments;
      })
    );
  }
}
