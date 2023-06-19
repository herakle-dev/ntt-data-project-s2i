import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './components/post/post.component';
import { PaginatorModule } from "../../shared/paginatorButton/paginator/paginator.module";
import { UikitModule } from 'src/app/shared/uikit/uikit.module';
import { CommentModule } from "../comment/comment.module";
import { PostFormModule } from './components/post-form/post-form.module';
import { BigmoduleModule } from "../bigmodule.module";

@NgModule({
    declarations: [
        PostComponent,
    ],
    exports: [PostComponent, PostRoutingModule],
    imports: [
        CommonModule,
        PostRoutingModule,
        PaginatorModule,
        UikitModule,
        CommentModule,
        PostFormModule,
        BigmoduleModule
    ]
})
export class PostModule { }
