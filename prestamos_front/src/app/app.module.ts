import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Peticiones HTTP
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// ROUTING
import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';

// SERVICES
import { PrestamosService } from './services/prestamos.service';

// INTERCEPTORS
import { TokenInterceptor } from './interceptors/TokenInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    PrestamosService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
