import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { InfoResponse } from 'src/app/models/inforesponse';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  // configuracion de la tabla
  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'comentario', 'telefono', 'email'];
  dataSource = new MatTableDataSource();
  selectedRowIndex = -1;

  // cliente seleccionado
  selectedCliente: Cliente = null;

  constructor(
    private clientesSRV: ClientesService
  ) { }

  ngOnInit() {

    // Obtener la lista de clientes
    this.clientesSRV.getClientes().subscribe( (response: InfoResponse) => {

      this.dataSource.data = response.data;

    });

  }

  highlight(row: any): void {

    this.selectedRowIndex = row.id;

  }

  selectCliente(id: number): void {

    // // obtener la información del prestamo
    // this.prestamosSRV.getPrestamo(id).subscribe( (response: InfoResponse) => {

    //   this.selectedPrestamo = response.data.shift();

    // });

  }

}
