import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// HTTP
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// MODULOS
import { FullwidthModule } from './layouts/fullwidth/fullwidth.module';
import { DefaultModule } from './layouts/default/default.module';
import { RouterModule } from '@angular/router';

// SERVICIOS
import { AuthService } from './services/auth.service';
import { ClientesService } from './services/clientes.service';
import { IntermediariosService } from './services/intermediarios.service';

// INTERCEPTORS
import { TokenInterceptor } from './interceptors/token.interceptor';
import { MaestrosService } from './services/maestros.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FullwidthModule,
    DefaultModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ClientesService,
    IntermediariosService,
    MaestrosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
