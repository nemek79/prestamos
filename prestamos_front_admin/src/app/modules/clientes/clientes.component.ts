import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { InfoResponse } from 'src/app/models/inforesponse';
declare var $;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  @ViewChild('dataTable', {static: false}) table;
  dataTable: any;

  // configuracion de la tabla
  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'comentario', 'telefono', 'email'];
  clientes: Cliente[];
  selectedRowIndex = -1;

  // cliente seleccionado
  selectedCliente: Cliente = null;

  constructor(
    private clientesSRV: ClientesService
  ) { }

  ngOnInit() {

    // Obtener la lista de clientes
    this.clientesSRV.getClientes().subscribe( (response: InfoResponse) => {

      this.clientes = response.data;

      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable();

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

  showDialogToAdd() {
    console.log('show dialog to add')
  }

}
