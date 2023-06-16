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
  posts: any[] = [];
  userId!: number;
  postId!: number;
  userName: any;
  postShown = false;
  commentsCount: { [postId: number]: number } = {};
commentShown:boolean

  constructor(
    private userDetailsService: UserDetailsService,
    private commentService: CommentService
  ) {}

  //when the component is oninit we get all information that we  need to make all calls
  ngOnInit(): void {
    this.userDetailsService.getUserDetail()
    .subscribe(
      (user: any) => {
        //user object with all property
        this.user = user;
        //the user id used to retrive all posts/comments and create the url
        this.userId = this.user.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }
//simply function used for a button click event that retrive all posts  and comments for this user
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
