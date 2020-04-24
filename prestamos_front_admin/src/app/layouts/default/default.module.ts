import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { InicioComponent } from 'src/app/modules/inicio/inicio.component';
import { ErrorpageComponent } from 'src/app/modules/errorpage/errorpage.component';
import { PrestamosService } from 'src/app/services/prestamos.service';

@NgModule({
  declarations: [
    DefaultComponent,
    InicioComponent,
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
    MatTableModule
  ],
  providers: [
    PrestamosService
  ]
})
export class DefaultModule { }
