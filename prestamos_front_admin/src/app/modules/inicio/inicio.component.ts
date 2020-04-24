import { Component, OnInit } from '@angular/core';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { Prestamo } from 'src/app/models/prestamo';
import { InfoResponse } from 'src/app/models/inforesponse';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {


  public lstPrestamos: Prestamo[]; // lista de prestamos abiertos

  constructor(
    private prestamosSRV: PrestamosService
  ) { }

  ngOnInit() {

    // obtener la lista de los prestamos abiertos
    this.prestamosSRV.getPrestamosAbiertos().subscribe( (response: InfoResponse) => {

      this.lstPrestamos = response.data;

      console.log(this.lstPrestamos)

    });

  }

}
