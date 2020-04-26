import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule,
          MatTableModule, MatListModule } from '@angular/material';
import { InicioComponent } from 'src/app/modules/inicio/inicio.component';
import { ErrorpageComponent } from 'src/app/modules/errorpage/errorpage.component';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { ClientesComponent } from 'src/app/modules/clientes/clientes.component';
import { IntermediariosComponent } from 'src/app/modules/intermediarios/intermediarios.component';
import { PrestamosComponent } from 'src/app/modules/prestamos/prestamos.component';

@NgModule({
  declarations: [
    DefaultComponent,
    InicioComponent,
    ClientesComponent,
    IntermediariosComponent,
    PrestamosComponent,
    ErrorpageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    MatSidenavModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule
  ],
  providers: [
    PrestamosService
  ]
})
export class DefaultModule { }
