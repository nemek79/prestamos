import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoResponse } from '../models/inforesponse';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

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
   * Crea un nuevo cliente
   */
  public createCliente(cliente: Cliente): Observable<any> {

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
