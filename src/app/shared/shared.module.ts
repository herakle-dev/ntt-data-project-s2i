import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';
import { PaginatorModule } from './paginatorButton/paginator/paginator.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, NavbarModule, FooterModule, PaginatorModule],
  exports: [NavbarModule, FooterModule, PaginatorModule],
})
export class SharedModule {}
