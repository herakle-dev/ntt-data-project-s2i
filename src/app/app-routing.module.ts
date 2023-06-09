import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './modules/user/components/user/user.component';
import { PostComponent } from './modules/post/components/post/post.component';
import { HomeComponent } from './shared/home/home/home.component';
import { AuthGuard } from './core/auth/guard.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard],},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
