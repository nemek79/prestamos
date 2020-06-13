import { environment } from './../../environments/environment.prod';
import { InfoResponse } from '../models/inforesponse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Obtiene todos los prestamos abiertos
   */
  public getPrestamosAbiertos(): Observable<InfoResponse> {

    const urlEndpoint = environment.urlBack + '/prestamos/dashboard';

    return this.http.get<InfoResponse>(urlEndpoint);

  }

  /**
   * Actualiza la mensualidad, crea una mensualidad
   */
  public setPrestamoMensualidadPagado(idPrestamo: number): Observable<InfoResponse> {

    const urlEndpoint = environment.urlBack + '/prestamos/pagado/' + idPrestamo;

    const httpHeaders = new HttpHeaders({
    });

    return this.http.post<InfoResponse>(urlEndpoint, null, {headers: httpHeaders});

  }

  public createComentario(idPrestamo: number, comentarioIn: string): Observable<InfoResponse> {

    const urlEndpoint = environment.urlBack + '/prestamos/comentario/' + idPrestamo;

    const httpHeaders = new HttpHeaders({
    });


    return this.http.post<InfoResponse>(urlEndpoint, comentarioIn);
  }

  /**
   * Obtiene la información a mostrar en el dashboard
   */
  public getDashboardInfo(): Observable<InfoResponse> {

    const urlEndpoint = environment.urlBack + '/prestamos/front/dashboard';

    return this.http.get<InfoResponse>(urlEndpoint);

  }

}
