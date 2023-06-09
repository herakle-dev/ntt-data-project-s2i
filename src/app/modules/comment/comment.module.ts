import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { CommentComponent } from './component/comment/comment.component';
import { CommentFormComponent } from './comment-form/comment-form/comment-form.component';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';


@NgModule({
  declarations: [
    CommentComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule,
    CommentRoutingModule,
    UikitModule
  ],
  exports:[CommentComponent,CommentFormComponent,CommentRoutingModule]
})
export class CommentModule { }
