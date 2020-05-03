import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoResponse } from '../models/inforesponse';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { DataResponse } from '../models/dataResponse';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * Obtiene todos los clientes
   */
  public getClientes(): Observable<InfoResponse> {

    const urlEndpoint = environment.urlBack + '/clientes';

    return this.http.get<InfoResponse>(urlEndpoint);

  }

  /**
   * Obtiene un cliente por id
   */
  public getCliente(id: number): Observable<DataResponse> {

    const urlEndpoint = environment.urlBack + '/clientes/' + id;

    return this.http.get<DataResponse>(urlEndpoint);

  }

  /**
   * Crea o edita (si ya existe) un cliente
   */
  public saveCliente(cliente: Cliente): Observable<any> {

    const urlEndpoint = environment.urlBack + '/clientes';

    return this.http.post<any>(urlEndpoint, cliente);

  }

  /**
   * Elimina un conjunto de clientes
   */
  public deleteClientes(clientes: number[]): Observable<any> {

    const urlEndpoint = environment.urlBack + '/clientes/delete';

    return this.http.post<any>(urlEndpoint, clientes);

  }

}
