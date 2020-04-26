import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoResponse } from '../models/inforesponse';
import { environment } from 'src/environments/environment';

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

}
