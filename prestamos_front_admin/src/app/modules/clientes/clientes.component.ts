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
  msgs = [];

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
    }, err => {

      this.msgs.push({severity: 'error',
      summary: 'Error!',
      detail: 'No se han podido recuperar los datos de los clientes'});

      setTimeout(() => { this.releaseMensaje(); }, 5000);
    });

  }

  /**
   * Muestra el modal de cliente
   */
  mdlClienteShow(event: any): void {

    // comprobar si es modo edición o crear nuevo cliente
    if (this.selectedChecks.length > 0) {

      // recuperar los datos del cliente
      this.clientesSRV.getCliente(this.selectedChecks[0]).subscribe( response => {

        this.selectedCliente = response.data;
        this.mdlCliente = true;

      }, err => {

        this.msgs.push({severity: 'error',
        summary: 'Error!',
        detail: 'No se han podido recuperar los datos del cliente'});

        setTimeout(() => { this.releaseMensaje(); }, 5000);
      }
      );

    } else {

      this.selectedCliente = new Cliente();
      this.mdlCliente = true;

    }

  }

  /**
   * Cierra el modal de cliente descartando los datos
   */
  discardCliente() {

    this.mdlCliente = false;
    this.selectedCliente = new Cliente();

  }

  /**
   * Crear nuevo cliente o editarlo si ya existe
   */
  saveCliente() {

    const table = this.dataTable.DataTable();

    this.clientesSRV.saveCliente(this.selectedCliente).subscribe( response => {

      if (this.selectedChecks.length === 0) {

        table.row.add(response.data).draw(false);

      } else {
        // modificar la línea editada
        this.modRow(this.selectedChecks[0], response.data);
      }

      this.mdlCliente = false;
      this.selectedCliente = new Cliente();
      if (this.selectedChecks.length === 0) {
        this.setOnClickTable();
      }

    }, err => {

      this.msgs.push({severity: 'error',
      summary: 'Error!',
      detail: 'No se ha podido guardar el cliente'});

      setTimeout(() => { this.releaseMensaje(); }, 5000);
    });

  }

  /**
   * Elimina los clientes indicados en el array de seleccionados
   */
  deleteClientes() {

    const table = this.dataTable.DataTable();

    this.clientesSRV.deleteClientes(this.selectedChecks).subscribe( response => {

      table.rows( ( idx, data, node ) => {

        if (this.selectedChecks.indexOf(data.id.toString()) > -1) {

          return true;
        }

        return false;

      } )
      .remove().draw();

      this.selectedChecks = [];

      this.msgs.push({severity: 'success',
                      summary: 'Borrado correcto.',
                      detail: 'Todos los clientes seleccionados han sido eliminados'});

      setTimeout(() => { this.releaseMensaje(); }, 5000);

    }, err => {

      this.msgs.push({severity: 'error',
      summary: 'Error!',
      detail: 'No se ha podido eliminar el cliente'});

      setTimeout(() => { this.releaseMensaje(); }, 5000);
    });

  }

  // ========================================
  // FUNCIONES PRIVADAS
  // ========================================

  private modRow(id: any, cliente: Cliente) {

    const table = this.dataTable.DataTable();

    const row = table.rows( ( idx, data, node ) => {

      if (data.id == id) {
        return true;
      }
      return false;
    });

    table.row(row).data(cliente).draw(false);

    this.selectedChecks = [];
  }

  private checkSelected(id: any) {

    const exists = this.selectedChecks.indexOf(id);

    if (exists > -1) {
      // ya está seleccionado, lo borramos
      this.selectedChecks.splice(exists, 1);

    } else {
      this.selectedChecks.push(id);
    }

  }

  /**
   * carga eventos en general tras la carga de la tabla de clientes
   */
  private loadDataEvents() {

    this.setOnClicksTable();

  }

  /**
   * Establece los onclicks de los checks de la tabla de clientes
   */
  private setOnClicksTable() {

    const inputs  = document.querySelectorAll('input[type="checkbox"]');

    inputs.forEach(input => {

      input.addEventListener('click', (event) => {

          this.checkSelected(input.getAttribute('value'));

        }
      );

    });

  }

  /**
   * Estable el onclick para una fila
   */
  private setOnClickTable() {

    const inputs = document.querySelectorAll('input[type="checkbox"]');
    const input = inputs[inputs.length - 1];

    input.addEventListener('click', (event) => {

      this.checkSelected(input.getAttribute('value'));

    }

  );

  }

  private releaseMensaje() {

    this.msgs = [];

  }

}
