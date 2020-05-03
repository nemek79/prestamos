import { Component, OnInit } from '@angular/core';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { Prestamo } from 'src/app/models/prestamo';
import { InfoResponse } from 'src/app/models/inforesponse';
import { MatTableDataSource } from '@angular/material';
import { DataResponse } from 'src/app/models/dataResponse';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  // configuracion de la tabla
  displayedColumns: string[] = ['id', 'finicio', 'ffinal', 'importe', 'interes',
                                'cliente', 'intermediario', 'estado', 'mensualidad'];
  dataSource = new MatTableDataSource();
  selectedRowIndex = -1;

  // prestamo seleccionado
  selectedPrestamo: Prestamo = null;

  constructor(
    private prestamosSRV: PrestamosService
  ) { }

  ngOnInit() {

    // obtener la lista de los prestamos abiertos
    this.prestamosSRV.getPrestamosAbiertos().subscribe( (response: InfoResponse) => {

      this.dataSource.data = response.data;

    });

  }

  highlight(row: any): void {

    this.selectedRowIndex = row.id;

  }

  selectPrestamo(id: number): void {

    // obtener la información del prestamo
    this.prestamosSRV.getPrestamo(id).subscribe( (response: DataResponse) => {

      this.selectedPrestamo = response.data.shift();

    });

  }
}
