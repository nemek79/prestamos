import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FullwidthComponent } from './layouts/fullwidth/fullwidth.component';
import { IntermediariosComponent } from './pages/intermediarios/intermediarios.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DefaultComponent } from './layouts/default/default.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'inicio',
        component: InicioComponent,
        canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}
      },
      {
        path: 'prestamos',
        component: PrestamosComponent,
        canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}
      },
      {
        path: 'clientes',
        component: ClientesComponent,
        canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}
      },
      {
        path: 'intermediarios',
        component: IntermediariosComponent,
        canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}
      }
    ]
  },
  {
    path: '',
    component: FullwidthComponent,
    children: [
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
