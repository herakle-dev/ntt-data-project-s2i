import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GetAllService } from 'src/app/shared/services/get-all.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postPerPage!: number;

  constructor(private recursiveGetService:GetAllService) { }



  getAllPosts(): Observable<any[]> {
    const postUrl = 'https://gorest.co.in/public/v2/posts'
    return this.recursiveGetService.getAllInApi(100, postUrl).pipe(
      map((pages: any[][]) => {
        const allPosts = pages.reduce((accumulator, page) => accumulator.concat(page), []);
        return allPosts;
      })
    );
  }


//   this.postService.getEveryPostComments(postId)
// .subscribe((allComments:any[])=>{
//   allComments= allComments.filter(
//     (comment)=>comment.post_id ===postId
//   )
//   this.everyCommentArray=allComments
//   post.commentsCount=this.everyCommentArray.length
// })
}
