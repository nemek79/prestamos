import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario: Usuario;
  private token: string;

  constructor(
    private http: HttpClient
  ) { }

  public login(usuario: Usuario): Observable<any> {

    const urlEndpoint = environment.urlEndPointAuth + '/oauth/token';
    const credenciales = btoa(environment.client + ':' + environment.clientPass);

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales
    });

    const params = new URLSearchParams();

    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});

  }

  public getToken(): string {

    if (this.token != null) {
      return this.token;
    } else if (this.token == null && sessionStorage.getItem('presadmin.token')) {
      this.token = sessionStorage.getItem('presadmin.token');
      return this.token;
    }

    return null;

  }

  guardarUsuario(accessToken: string): void {

    const payload = this.obtenerDatosToken(accessToken);

    this.usuario = new Usuario();

    this.usuario.roles = payload.authorities;
    this.usuario.username = payload.user_name;

    // Guardar el usuario en el session storage
    sessionStorage.setItem('presadmin.usuario', JSON.stringify(this.usuario));

  }

  guardarToken(accessToken: string): void {

      this.token = accessToken;
      sessionStorage.setItem('presadmin.token', accessToken);

  }

  obtenerDatosToken(accessToken: string): any {

    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }

    return null;
  }

  hasRole(role: string): boolean {

    if (this.getUsuario().roles.includes(role)) {
      return true;
    }

    return false;

  }

  logout(): void {

      this.token = null;
      this.usuario = null;
      sessionStorage.clear();

  }

  public getUsuario(): Usuario {

    if (this.usuario != null) {
      return this.usuario;
    } else if (this.usuario == null && sessionStorage.getItem('presadmin.usuario')) {
      this.usuario = JSON.parse(sessionStorage.getItem('presadmin.usuario')) as Usuario;
      return this.usuario;
    }

    return new Usuario();
  }

  isAuthenticated(): boolean {

    const payload = this.obtenerDatosToken(this.getToken());

    if (payload != null && payload.user_name && payload.user_name.length > 0) {

      return true;
    }

    return false;
  }

}
