import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule } from '@angular/material';
import { InicioComponent } from 'src/app/modules/inicio/inicio.component';
import { ErrorpageComponent } from 'src/app/modules/errorpage/errorpage.component';

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
    MatSidenavModule
  ]
})
export class DefaultModule { }
