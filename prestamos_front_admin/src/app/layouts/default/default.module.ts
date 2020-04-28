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
import { ClientesService } from 'src/app/services/clientes.service';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    BrowserAnimationsModule,
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
    MatListModule,
    TableModule,
    ButtonModule
  ],
  providers: [
    PrestamosService,
    ClientesService
  ]
})
export class DefaultModule { }
