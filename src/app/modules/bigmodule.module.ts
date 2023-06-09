import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BigModuleRouting } from './bigmodule-routing.module';
import { AuthGuard } from '../core/auth/guard.guard';
import { HomeComponent } from '../shared/home/home/home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    BigModuleRouting,

  ],
  exports:[
    HomeComponent
  ],
  providers:[AuthGuard,  ]
})
export class BigmoduleModule { }
