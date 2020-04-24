import { Component, OnInit } from '@angular/core';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { Prestamo } from 'src/app/models/prestamo';
import { InfoResponse } from 'src/app/models/inforesponse';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  // configuracion de la tabla
  displayedColumns: string[] = ['id', 'finicio', 'ffinal', 'importe', 'interes',
                                'cliente','intermediario','estado','mensualidad'];
  dataSource = new MatTableDataSource();
  selectedRowIndex: number = -1;

  constructor(
    private prestamosSRV: PrestamosService
  ) { }

  ngOnInit() {

    // obtener la lista de los prestamos abiertos
    this.prestamosSRV.getPrestamosAbiertos().subscribe( (response: InfoResponse) => {

      this.dataSource.data = response.data;
      console.log(this.dataSource.data)

    });

  }

  highlight(row) {

    this.selectedRowIndex = row.id;

  }
}
