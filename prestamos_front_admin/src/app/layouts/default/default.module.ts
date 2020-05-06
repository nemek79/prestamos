import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { InicioComponent } from 'src/app/pages/inicio/inicio.component';
import { ClientesComponent } from 'src/app/pages/clientes/clientes.component';
import { IntermediariosComponent } from 'src/app/pages/intermediarios/intermediarios.component';
import { PrestamosComponent } from 'src/app/pages/prestamos/prestamos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { PrestamosService } from 'src/app/services/prestamos.service';



@NgModule({
  declarations: [
    DefaultComponent,
    InicioComponent,
    PrestamosComponent,
    ClientesComponent,
    IntermediariosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    PrestamosService
  ]
})
export class DefaultModule { }
