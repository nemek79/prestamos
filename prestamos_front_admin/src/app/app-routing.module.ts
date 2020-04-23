import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { PostsComponent } from './modules/posts/posts.component';
import { LoginComponent } from './modules/login/login.component';
import { FullwidthComponent } from './layouts/fullwidth/fullwidth.component';

// GUARDS
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { ErrorpageComponent } from './modules/errorpage/errorpage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'posts',
        component: PostsComponent,
        canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}
      },
      {
        path: 'error',
        component: ErrorpageComponent
      }
    ]
  },
  {
    path: '',
    component: FullwidthComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
