import { environment } from './../../environments/environment.prod';
import { InfoResponse } from '../models/inforesponse';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
   * Obtiene la información de un préstamo
   */
  public getPrestamo(id: number): Observable<InfoResponse> {

    const urlEndpoint = environment.urlBack + '/prestamos/'+id;

    return this.http.get<InfoResponse>(urlEndpoint);

  }


}
