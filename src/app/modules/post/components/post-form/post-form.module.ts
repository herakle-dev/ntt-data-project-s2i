import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from './post-form.component';
import { UikitModule } from 'src/app/shared/uikit/uikit.module';



@NgModule({
  declarations: [PostFormComponent],
  exports:[PostFormComponent],
  imports: [
    CommonModule,

    UikitModule,
  ]
})
export class PostFormModule { }
