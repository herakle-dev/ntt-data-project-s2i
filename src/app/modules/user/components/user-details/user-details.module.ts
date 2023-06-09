import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserDetailsComponent } from './user-details.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';
import { CommentModule } from "../../../comment/comment.module";


@NgModule({
    declarations: [UserDetailsComponent],
    exports: [UserDetailsComponent],
    imports: [
        CommonModule,
        UserDetailsRoutingModule,
        UikitModule,
        CommentModule
    ]
})
export class UserDetailsModule { }
