import { InfoResponse } from './../../models/inforesponse';
import { PrestamosService } from './../../services/prestamos.service';
import { Component, OnInit } from '@angular/core';
import { Prestamo } from 'src/app/models/prestamo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public lstPrestamos: Prestamo[];

  constructor(
    private prestamosSRV: PrestamosService
  ) { }

  ngOnInit() {

    this.prestamosSRV.getPrestamosAbiertos().subscribe( (response: InfoResponse) => {

      this.lstPrestamos = response.data;

    });

  }

}
