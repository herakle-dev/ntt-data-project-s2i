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
  selectedPostId: number | null = null;
  comments: any[] = [];
  @Input() postId: number | null;

  errorCode: number | null = null;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.getComments(this.postId);
  }

  getComments(postId: number | null) {
    if (this.selectedPostId === postId && this.commentShown) {
      this.commentShown = false;
    }
    this.selectedPostId = postId;
    this.commentShown = true;
    if (postId) {
      this.commentService.getEveryPostComments(postId).subscribe(
        (comments: any[]) => {
          this.comments = comments
            .filter((comment) => comment.post_id === postId)
            .filter((comment, index, self) => {
              return (
                index ===
                self.findIndex(
                  (c) => c.id === comment.id && c.name === comment.name
                )
              );
            });
        },
        (error: any) => {
          this.errorCode = error.status;
        }
      );
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
