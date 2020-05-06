import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FullwidthComponent } from './layouts/fullwidth/fullwidth.component';
import { IntermediariosComponent } from './pages/intermediarios/intermediarios.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DefaultComponent } from './layouts/default/default.component';


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
        component: InicioComponent
      },
      {
        path: 'prestamos',
        component: PrestamosComponent
      },
      {
        path: 'clientes',
        component: ClientesComponent
      },
      {
        path: 'intermediarios',
        component: IntermediariosComponent
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
