import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';
import { SharedModule } from '../../shared/shared.module';

import { UserDetailsModule } from './components/user-details/user-details.module';
import { UserFormModule } from './components/user-form/user-form.module';
import { PaginatorModule } from 'src/app/shared/paginatorButton/paginator/paginator.module';
import { BigmoduleModule } from "../bigmodule.module";

@NgModule({
    declarations: [UserComponent],
    exports: [UserComponent, UserRoutingModule, PaginatorModule],
    providers: [],
    imports: [
        CommonModule,
        UserRoutingModule,
        UikitModule,
        SharedModule,
        UserFormModule,
        UserDetailsModule,
        PaginatorModule,
        BigmoduleModule
    ]
})
export class UserModule {}
