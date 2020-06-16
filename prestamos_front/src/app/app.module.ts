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
import { PerfilComponent } from './components/perfil/perfil.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { InfoyearsComponent } from './components/infoyears/infoyears.component';

// SERVICES
import { PrestamosService } from './services/prestamos.service';
import { AuthService } from './services/auth.service';

// INTERCEPTORS
import { TokenInterceptor } from './interceptors/TokenInterceptor';

// ICONS
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent,
    PerfilComponent,
    PrestamosComponent,
    InfoyearsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
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
