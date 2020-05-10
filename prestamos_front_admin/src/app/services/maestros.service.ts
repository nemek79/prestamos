import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoResponse } from '../models/inforesponse';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class MaestrosService {

    constructor(
        private http: HttpClient
        ) { }


    public getEstadosPrestamo(): Observable<InfoResponse> {

        const urlEndpoint = environment.urlBack + '/maestros/estadosprestamo';

        return this.http.get<InfoResponse>(urlEndpoint);
    }

}
