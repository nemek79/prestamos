import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { InfoResponse } from 'src/app/models/inforesponse';
import {MenuItem} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';

declare var $;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  mdlCliente: boolean = false; // modal de crear un nuevo cliente

  @ViewChild('dataTable', {static: false}) table;
  dataTable: any;

  // cliente seleccionado
  selectedCliente: Cliente = null;

  constructor(
    private clientesSRV: ClientesService
  ) { }

  ngOnInit() {

    this.items = [
      {label: 'Clientes', url: 'clientes', icon: 'pi pi-user'}
    ];

    this.home = {icon: 'pi pi-home'};

    // Obtener la lista de clientes
    this.clientesSRV.getClientes().subscribe( (response: InfoResponse) => {

      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable({
        paging:   false,
        ordering: false,
        info:     false,
        searching: false,
        rowReorder: {
          selector: 'td:nth-child(2)'
        },
        responsive: true,
        data: response.data,
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'NOMBRE', data: 'nombre' },
            { title: 'APELLIDOS', data: 'apellidos' },
            { title: 'COMENTARIO', data: 'comentario' },
            { title: 'TELEFONO', data: 'telefono' },
            { title: 'EMAIL', data: 'email' }
        ]
      });

    });

  }

  addNewCliente(event: any): void {

    this.mdlCliente = true;

  }


}
