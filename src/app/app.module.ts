import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { BigmoduleModule } from './modules/bigmodule.module';
import { UikitModule } from './shared/uikit/uikit.module';


@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //my module
BigmoduleModule,
    SharedModule,
    UikitModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
