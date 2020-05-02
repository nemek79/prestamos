import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { InfoResponse } from 'src/app/models/inforesponse';
import {MenuItem} from 'primeng/api';


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

  selectedChecks: number[];

  @ViewChild('dataTable', {static: false}) table;
  dataTable: any;

  // cliente seleccionado
  selectedCliente: Cliente = null;

  constructor(
    private clientesSRV: ClientesService
  ) { }


  ngOnInit() {

    this.selectedCliente = new Cliente();
    this.selectedChecks = [];

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
        columnDefs: [
          {
          targets: 0,
          searchable: false,
          orderable: false,
          className: 'dt-body-center',
          render( data, type, row, meta ) {
              return '<input type="checkbox" name="checkId[' + row.id + ']" value="'
                      + row.id + '">';
            }
          },
          { title: 'ID', data: 'id', orderable: false, className: '', targets:  1 },
          { title: 'NOMBRE', data: 'nombre', orderable: false, className: '', targets:  2 },
          { title: 'APELLIDOS', data: 'apellidos', orderable: false, className: '', targets:  3 },
          { title: 'COMENTARIO', data: 'comentario', orderable: false, className: '', targets:  4 },
          { title: 'TELEFONO', data: 'telefono', orderable: false, className: '', targets:  5 },
          { title: 'EMAIL', data: 'email', orderable: false, className: '', targets:  6},
        ]
      });

      this.loadDataEvents();
    });

  }

  /**
   * Muestra el modal de cliente
   */
  addNewClienteShow(event: any): void {

    this.mdlCliente = true;

  }

  /**
   * Cierra el modal de cliente descartando los datos
   */
  discardCliente() {

    this.mdlCliente = false;
    this.selectedCliente = new Cliente();

  }

  /**
   * Crear nuevo cliente
   */
  createCliente() {

    const table = this.dataTable.DataTable();

    this.clientesSRV.createCliente(this.selectedCliente).subscribe( response => {

      table.row.add(response.data).draw(false);
      this.mdlCliente = false;
      this.selectedCliente = new Cliente();

    });

  }

  // ========================================
  // FUNCIONES PRIVADAS
  // ========================================

  private checkSelected(id: any) {

    const exists = this.selectedChecks.indexOf(id);

    if (exists > -1) {
      // ya está seleccionado, lo borramos
      this.selectedChecks.splice(exists, 1);

    } else {
      this.selectedChecks.push(id);
    }

  }

  private loadDataEvents() {

    const inputs  = document.querySelectorAll('input[type="checkbox"]');

    inputs.forEach(input => {

      input.addEventListener('click', (event) => {

          this.checkSelected(input.getAttribute('value'));

        }
      );

    });

  }

}
