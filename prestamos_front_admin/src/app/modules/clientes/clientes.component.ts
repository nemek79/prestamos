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

  // cliente seleccionado
  selectedCliente: Cliente = null;

  constructor(
    private clientesSRV: ClientesService
  ) { }

  ngOnInit() {

    // Obtener la lista de clientes
    this.clientesSRV.getClientes().subscribe( (response: InfoResponse) => {

      console.log(response.data)

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


}
