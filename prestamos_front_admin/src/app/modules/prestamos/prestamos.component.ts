import { Component, OnInit } from '@angular/core';
import { InfoResponse } from 'src/app/models/inforesponse';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { MatTableDataSource } from '@angular/material';
import { Prestamo } from 'src/app/models/prestamo';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss']
})
export class PrestamosComponent implements OnInit {

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
    this.prestamosSRV.getPrestamo(id).subscribe( (response: InfoResponse) => {

      this.selectedPrestamo = response.data.shift();

    });

  }

}
