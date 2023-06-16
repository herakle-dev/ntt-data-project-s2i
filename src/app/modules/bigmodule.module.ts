import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BigModuleRouting } from './bigmodule-routing.module';
import { AuthGuard } from '../core/auth/guard.guard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';



@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    BigModuleRouting,

  ],
  exports:[
NotFoundComponent
  ],
  providers:[AuthGuard,  ]
})
export class BigmoduleModule { }
