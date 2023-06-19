import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRoutingModule } from './comment-routing.module';
import { CommentComponent } from './component/comment/comment.component';
import { CommentFormComponent } from './component/comment-form/comment-form.component';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';
import { BigmoduleModule } from "../bigmodule.module";


@NgModule({
    declarations: [
        CommentComponent,
        CommentFormComponent
    ],
    exports: [CommentComponent, CommentFormComponent, CommentRoutingModule],
    imports: [
        CommonModule,
        CommentRoutingModule,
        UikitModule,
        BigmoduleModule
    ]
})
export class CommentModule { }
