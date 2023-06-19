import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form.component';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';
import { BigmoduleModule } from "../../../bigmodule.module";


@NgModule({
    declarations: [UserFormComponent],
    exports: [UserFormComponent],
    imports: [
        CommonModule,
        UikitModule,
        BigmoduleModule
    ]
})
export class UserFormModule { }
