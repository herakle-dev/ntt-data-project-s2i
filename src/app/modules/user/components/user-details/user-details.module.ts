import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserDetailsComponent } from './user-details.component';


import { UikitModule } from 'src/app/shared/uikit/uikit.module';
import { CommentModule } from "../../../comment/comment.module";
import { PostFormModule } from 'src/app/modules/post/components/post-form/post-form.module';


@NgModule({
    declarations: [UserDetailsComponent],
    exports: [UserDetailsComponent],
    imports: [
        CommonModule,
        UserDetailsRoutingModule,
        UikitModule,
        CommentModule,
        PostFormModule
    ]
})
export class UserDetailsModule { }
