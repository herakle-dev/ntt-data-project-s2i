import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './components/post/post.component';
import { PaginatorModule } from "../../shared/paginatorButton/paginator/paginator.module";
import { FormsModule } from '@angular/forms';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';
import { CommentModule } from "../comment/comment.module";

@NgModule({
    declarations: [
        PostComponent
    ],
    exports: [PostComponent, PostRoutingModule],
    imports: [
        CommonModule,
        PostRoutingModule,
        PaginatorModule,
        FormsModule,
        UikitModule,
        CommentModule
    ]
})
export class PostModule { }
