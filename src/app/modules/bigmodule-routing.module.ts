import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/guard.guard';

const routes: Routes = [{path:'login',loadChildren:()=>import('../shared/login/login.module').then(m=>m.LoginModule)  },
{ path: 'user', loadChildren: () => import('../modules/user/user.module').then(m => m.UserModule), canActivate:[AuthGuard] },
{path:'user/:id',  loadChildren: () => import('../modules/user/components/user-details/user-details.module').then(m => m.UserDetailsModule)},
{ path: 'comment', loadChildren: () => import('../modules/comment/comment.module').then(m => m.CommentModule), canActivate:[AuthGuard] },
{ path: 'post', loadChildren: () => import('../modules/post/post.module').then(m => m.PostModule), canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BigModuleRouting { }



/*,
*/
