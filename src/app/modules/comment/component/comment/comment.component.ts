import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  commentShown = false;
 @Input() newCommentShow = false;
 @Input() selectedPostId: number | null = null;
  @Input() currentPage = 1;

  @Input() comments: any[] = [];
  @Input() postId!: number | null;
  commentsCount = 0;

  constructor(private commentService: CommentService) {}
  ngOnInit(): void {
    this.getComments(this.postId);

  }

  getComments(postId: number | null) {
    if (this.selectedPostId === postId && this.commentShown) {
      this.commentShown = false;
    } else {
      this.selectedPostId = postId;
      this.commentShown = true;
      if (postId) {
        console.log()
        this.commentService.getEveryPostComments(postId).subscribe(
          (comments: any[]) => {
            this.comments = comments.filter(
              (comment) => comment.post_id === postId
            );
            // this.comments.forEach((comment) => {
            //   const commentId = comment.id;
            //   console.log(commentId);
            // });
          },
          (error: any) => {
            console.error(error);
          }
        );
      }
    }
  }

  toggleComments() {
    this.commentShown = !this.commentShown;
    this.newCommentShow = !this.newCommentShow;
  }

  newComment() {
    this.newCommentShow = !this.newCommentShow;
  }
}
