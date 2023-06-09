import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { UikitModule } from '../uikit/uikit.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
 UikitModule,
 LoginRoutingModule,
  ],
  exports: [LoginComponent],
  providers: [],
})
export class LoginModule {}
