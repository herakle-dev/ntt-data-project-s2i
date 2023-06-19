  import { Component, OnInit,Input } from '@angular/core';
  import { UserDetailsService } from '../../services/user-details.service';
  import { HttpErrorResponse } from '@angular/common/http';
  import { CommentService } from 'src/app/modules/comment/services/comment.service';
  import { Title } from '@angular/platform-browser';
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
    @Input () userName: string;
    postShown = false;
    commentsCount: { [postId: number]: number } = {};
    commentShown: boolean;
    errorCode: number | null = null;
    constructor(
      private userDetailsService: UserDetailsService,
      private commentService: CommentService,
      public title: Title
    ) {}

    //when the component is oninit we get all information that we  need to make all calls
    ngOnInit(): void {
this.retriveUserDetails()
    }

    retriveUserDetails(){
      this.userDetailsService.getUserDetail().subscribe(
        (user: any) => {
          //user object with all property
          this.user = user;
          //the user id used to retrive all posts/comments and create the url
          this.userId = this.user.id;
          const title = `Profilo di ${user.name}`;
          this.title.setTitle(title);
        },
        (error) => {
          this.errorCode = error.status;
        }
      );
    }
    //simply function used for a button click event that retrive all posts  and comments for this user
    showPosts() {
      if (!this.postShown) {
        this.userDetailsService.getAllUserPost().subscribe(
          (allPosts: any[]) => {
            this.userPosts = allPosts;
            this.userPosts.forEach((post) => {
              const postId = post.id;
              this.commentService.getEveryPostComments(postId);
            });
          },
          (error: HttpErrorResponse) => {
            this.errorCode = error.status;
          }
        );
        this.postShown = true;
      }
    }
  }
