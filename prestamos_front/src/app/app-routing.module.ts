import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { InfoyearsComponent } from './components/infoyears/infoyears.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}
  },
  {
    path: 'prestamos',
    component: PrestamosComponent,
    canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}
  },
  {
    path: 'infoyears',
    component: InfoyearsComponent,
    canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
