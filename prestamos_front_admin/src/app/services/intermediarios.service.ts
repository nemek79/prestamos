import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoResponse } from '../models/inforesponse';
import { environment } from 'src/environments/environment';
import { DataResponse } from '../models/dataResponse';
import { Intermediario } from '../models/intermediario';

@Injectable({
  providedIn: 'root'
})
export class IntermediariosService {
  constructor(
    private http: HttpClient
  ) { }

/**
 * Obtiene todos los intermediarios
 */
public getIntermediarios(): Observable<InfoResponse> {

    const urlEndpoint = environment.urlBack + '/intermediarios';

    return this.http.get<InfoResponse>(urlEndpoint);

}

/**
 * Obtiene un cliente por id
 */
public getIntermediario(id: number): Observable<DataResponse> {

    const urlEndpoint = environment.urlBack + '/intermediarios/' + id;

    return this.http.get<DataResponse>(urlEndpoint);

}

/**
 * Crea o edita (si ya existe) un intermediario
 */
public saveIntermediario(intermediario: Intermediario): Observable<any> {

    const urlEndpoint = environment.urlBack + '/intermediarios';

    return this.http.post<any>(urlEndpoint, intermediario);

}

/**
 * Elimina un conjunto de intermediarios
 */
public deleteIntermediarios(intermediarios: string[]): Observable<any> {

    const urlEndpoint = environment.urlBack + '/intermediarios/delete';

    return this.http.post<any>(urlEndpoint, intermediarios);

}
}
