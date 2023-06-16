  import { Injectable } from '@angular/core';
  import { UserService } from './user.service';
  import {  LocationStrategy } from '@angular/common';
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
      private locationStrategy: LocationStrategy,
      private http: HttpClient
    ) {}
//taking current url
    public currentUrl = this.locationStrategy.path();
    //then split it for '/'
    public pathArray = this.currentUrl.split('/');
    //then we get the userid based on the url path
    public userId = this.pathArray[2];
    //so we can make the url for to get user post
    public postUrl = `${this.url}/${this.userId}/posts`;
    //max post per page for user to display
    public postPerPage = 100;

    //simply get to get posts using post url and header(using user token)
    getUserDetail(): Observable<any> {
      return this.http.get(`${this.url}/${this.userId}`, { headers: this.headers });
    }
//we use recursiveget to retrive all user post until we get an empty array that means all posts are retrived
    getAllUserPost(userId: number): Observable<any[]> {
      const postUrl = `${this.url}/${userId}/posts`;
      return this.recursiveGetService.getAllInApi(this.postPerPage, postUrl).pipe(
        map((pages: any[][]) => {
          const allPosts = pages.reduce((accumulator, page) => accumulator.concat(page), []);
          return allPosts;
        })
      );
    }
//same logic as post for comments but we use a new param postId to make the comments request
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
