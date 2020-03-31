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

    const urlEndpoint = 'http://localhost:8092/api/prestamos/dashboard';

    return this.http.get<InfoResponse>(urlEndpoint);

  }

}
