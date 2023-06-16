import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GetAllService } from 'src/app/shared/services/get-all.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  postId: number | null = null;

  constructor(
    private recursiveGetService: GetAllService,
    private http: HttpClient
  ) {}

   allComments =[];
   getEveryPostComments(postId: number | null): Observable<any[]> {
    if (postId) {
      const commentsUrl = `https://gorest.co.in/public/v2/posts/${postId}/comments`;
      return this.http.get(commentsUrl, { headers: this.recursiveGetService.headers }).pipe(
        // eslint-disable-next-line @typescript-eslint/ban-types
        map((pages: Object) => {
          this.allComments = Object.values(pages).reduce((accumulator, page) => accumulator.concat(page), []);
          return this.allComments;
        })
      );
    } else {
      return new Observable<any[]>((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
  }




  sendCommentAtPost(postId: number| null, comment:any): Observable<any> {
    const commentsUrl = `https://gorest.co.in/public/v2/posts/${postId}/comments`;
    return this.http.post(commentsUrl, comment,{headers: this.recursiveGetService.headers});
  }
}
