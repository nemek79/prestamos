import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// FORMULARIOS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Peticiones HTTP
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// ROUTING
import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';

// SERVICES
import { PrestamosService } from './services/prestamos.service';
import { AuthService } from './services/auth.service';

// INTERCEPTORS
import { TokenInterceptor } from './interceptors/TokenInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PrestamosService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
