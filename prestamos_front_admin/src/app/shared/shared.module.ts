import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule, MatCardModule } from '@angular/material';
import { InfocardComponent } from './widgets/infocard/infocard.component';
import { NavegacionComponent } from './widgets/navegacion/navegacion.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    InfocardComponent,
    NavegacionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    MatCardModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    InfocardComponent,
    NavegacionComponent
  ]
})
export class SharedModule { }
