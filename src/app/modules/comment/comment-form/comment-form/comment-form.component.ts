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
  @Input() newCommentShow = false;
  @Input() postId!: number | null ;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  formData: any = {
    name: '',
    email: '',
    body: '',
  };

  submitForm(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const comment = {
      name: this.formData.name,
      email: this.formData.email,
      body: this.formData.body,

    };
    this.commentService.sendCommentAtPost(this.postId,comment).subscribe(
      (response) => {
        console.log(response, 'commento creato con successo!');
        location.reload()
      },
      (error) => {
        console.log('errore', error);
      }
    );
  }
  }


