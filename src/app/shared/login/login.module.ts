import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { UikitModule } from '../uikit/uikit.module';
import { BigmoduleModule } from "../../modules/bigmodule.module";

@NgModule({
    declarations: [LoginComponent],
    exports: [LoginComponent],
    providers: [],
    imports: [
        CommonModule,
        UikitModule,
        LoginRoutingModule,
        BigmoduleModule
    ]
})
export class LoginModule {}
