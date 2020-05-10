import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoResponse } from '../models/inforesponse';
import { environment } from 'src/environments/environment';
import { Prestamo } from '../models/prestamo';
import { DataResponse } from '../models/dataResponse';

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
  public getPrestamo(id: number): Observable<DataResponse> {

    const urlEndpoint = environment.urlBack + '/prestamos/' + id;

    return this.http.get<DataResponse>(urlEndpoint);

  }

  /**
   * Crea o edita (si ya existe) un prestamo
   */
  public savePrestamo(prestamo: Prestamo): Observable<any> {

    const urlEndpoint = environment.urlBack + '/prestamos';

    return this.http.post<any>(urlEndpoint, prestamo);

  }

  /**
   * Elimina un conjunto de clientes
   */
  public deletePrestamos(prestamos: number[]): Observable<any> {

    const urlEndpoint = environment.urlBack + '/prestamos/delete';

    return this.http.post<any>(urlEndpoint, prestamos);

  }

}
