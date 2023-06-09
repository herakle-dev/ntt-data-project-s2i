import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  commentShown = false;
  newCommentShow = false;
  selectedPostId: number | null = null;
  @Input() post: any;
  @Input() currentPage: number = 1;

  @Input() comments: any[] = [];
  @Input() postId!: number | null;
  commentsCount: number = 0;

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
      if (this.comments.length === 0 && postId) {
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
