import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../../services/user-details.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommentService } from 'src/app/modules/comment/services/comment.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: any;
  userPosts: any[] = [];
  userComments: any[] = [];
  posts: any[] = [];

  userId!: number;
  postId!: number;
  userName: any;
  postShown = false;
  commentShown = false;
  noPosts!: boolean;
  selectedPostId: number | null = null;

  commentsCount: { [postId: number]: number } = {};


  constructor(
    private userDetailsService: UserDetailsService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.userDetailsService.getUserDetail().subscribe(
      (user: any) => {
        this.user = user;
        this.userId = this.user.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showPosts() {
    if (!this.postShown) {
      this.userDetailsService.getAllUserPost(this.userId)
      .subscribe(
        (allPosts: any[]) => {
          this.userPosts = allPosts;
          this.userPosts.forEach((post) => {
            const postId = post.id;
this.commentService.getEveryPostComments(postId)
          });
        },
        (error: HttpErrorResponse) => {
          console.log(error, 'nessun post');
        }
      );
      this.postShown = true;
    }
  }
}
