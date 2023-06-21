import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {

  constructor(private commentService:CommentService){}
  //boolen var used to show or hide the new comment section
  @Input() newCommentShow = false;
  //postid used to make the new comment request(post)
  @Input() postId!: number | null ;
  errorCode: number | null = null;
  formData: any = {
    name: '',
    email: '',
    body: '',
  };

  submitForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
//comment param neeeded
    const comment = {
      name: this.formData.name,
      email: this.formData.email,
      body: this.formData.body,

    };
    this.commentService.sendCommentAtPost(this.postId,comment).subscribe(
      () => {
        location.reload()
      },
      (error) => {
        this.errorCode = error.status;
      }
    );
  }
  }


