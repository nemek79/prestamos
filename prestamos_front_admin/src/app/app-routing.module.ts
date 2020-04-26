import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './modules/login/login.component';
import { FullwidthComponent } from './layouts/fullwidth/fullwidth.component';

// GUARDS
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { ErrorpageComponent } from './modules/errorpage/errorpage.component';
import { InicioComponent } from './modules/inicio/inicio.component';
import { PrestamosComponent } from './modules/prestamos/prestamos.component';
import { ClientesComponent } from './modules/clientes/clientes.component';
import { IntermediariosComponent } from './modules/intermediarios/intermediarios.component';

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
