import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BigModuleRouting } from './bigmodule-routing.module';
import { AuthGuard } from '../core/auth/guard.guard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';



@NgModule({
  declarations: [NotFoundComponent,ErrorMessageComponent],
  imports: [
    CommonModule,
    BigModuleRouting,

  ],
  exports:[
NotFoundComponent,ErrorMessageComponent
  ],
  providers:[AuthGuard,  ]
})
export class BigmoduleModule { }
