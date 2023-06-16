import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';

import { BigModuleRouting } from 'src/app/modules/bigmodule-routing.module';
import { UikitModule } from '../uikit/uikit.module';


@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
UikitModule,
    BigModuleRouting,
  ],
  exports:[NavbarComponent]
})
export class NavbarModule { }
