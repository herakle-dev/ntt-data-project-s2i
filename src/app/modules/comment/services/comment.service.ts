  import { Injectable } from '@angular/core';
  import { Observable, map } from 'rxjs';
  import { GetAllService } from 'src/app/shared/services/get-all.service';

  @Injectable({
    providedIn: 'root'
  })
  export class CommentService {
    postId: number | null = null;

    constructor(private recursiveGetService: GetAllService) { }
    getEveryPostComments(postId: number | null): Observable<any[]> {
      if (postId) {
        const commentsUrl = `https://gorest.co.in/public/v2/posts/${postId}/comments`;
        return this.recursiveGetService.getAllInApi(100, commentsUrl).pipe(
          map((pages: any[][]) => {
            const allComments = pages.reduce((accumulator, page) => accumulator.concat(page), []);
            return allComments;
          })
        );
      } else {
        return new Observable<any[]>(observer => {
          observer.next([]);
          observer.complete();
        });
      }
    }



  }



