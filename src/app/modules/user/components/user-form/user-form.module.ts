import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form.component';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';


@NgModule({
  declarations: [UserFormComponent],
  imports: [
    CommonModule,
    UikitModule,
  ],
  exports:[UserFormComponent]
})
export class UserFormModule { }
