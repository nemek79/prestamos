import { Component, OnInit, ViewChild } from '@angular/core';

import * as Inputmask from 'inputmask';
import * as AutoNumeric from 'autonumeric';
import { Cliente } from 'src/app/models/cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import { InfoResponse } from 'src/app/models/inforesponse';
import { AppSettings } from 'src/app/utiles/appsettings';

declare var $;

declare var adminlte: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  @ViewChild('dataTable', {static: false}) table;
  dataTable: any;

  idsSeleccionados: string[];
  autonumerics = new Array();

  public showMdlError = false; // muestra el modal de error

  cliente: Cliente;
  public frmCliente: FormGroup;
  public statusSubmited = false;

  public cargando = false;

  constructor(
    private clientesSRV: ClientesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.cargando = false;

    this.idsSeleccionados = [];

    this.cliente = new Cliente();

    this.buildForm();

    this.clientesSRV.getClientes().subscribe( (response: InfoResponse) => {

      this.dataTable = $(this.table.nativeElement);

      this.dataTable.DataTable({
        pageLength: 10,
        language: AppSettings.TABLE_LANG_ES,
        paging:   true,
        ordering: false,
        info:     true,
        searching: true,
        responsive: true,
        rowReorder: {
          selector: 'td:nth-child(2)'
        },
        data: response.data,
        rowCallback: (row: Node, data: any, index: number) => {
          const self = this;

          // Unbind first in order to avoid any duplicate handler
          // (see https://github.com/l-lin/angular-datatables/issues/87)
          $('td', row).unbind('click');
          $('td', row).bind('click', () => {
            self.toggleCheckId(data.id);
          });
          return row;
        },
        columnDefs: [
          {
          targets: 0,
          searchable: false,
          orderable: false,
          className: 'dt-body-center',
          render( data, type, row, meta ) {
              return '<input type="checkbox" name="checkId[' + row.id + ']" value="'
                      + row.id + '" (click)="toggleCheckId(' + row.id + ')" class="chkClassName" />';
            }
          },
          { title: 'ID', data: 'id', orderable: false, className: '', targets:  1  },
          { title: 'NOMBRE', data: 'nombre', orderable: false, className: '', targets:  2 },
          { title: 'APELLIDOS', data: 'apellidos', orderable: false, className: '', targets:  3 },
          { title: 'TELEFONO', data: 'telefono', orderable: false, className: '', targets:  4 },
          { title: 'E-MAIL', data: 'email', orderable: false, className: '', targets:  5 },
          { title: 'COMENTARIO', data: 'comentario', orderable: false, className: '', targets:  6 },
        ]

      });

      new adminlte.Layout(document).fixLayoutHeight();

    }, err => {

        this.showMdlError = true;
    });

    this.ready();

  }


  /**
   * Abre el modal de clientes
   */
  openModalClientes() {

    if (this.idsSeleccionados.length === 0) {

      this.frmCliente.controls.nombreIn.setValue('');
      this.frmCliente.controls.apellidosIn.setValue('');
      this.frmCliente.controls.telefonoIn.setValue('');
      this.frmCliente.controls.emailIn.setValue('');
      this.frmCliente.controls.comentarioIn.setValue('');
      $('#mdlClientes').modal('show');

    } else {

      const idSeleccionado = this.idsSeleccionados[0];

      this.clientesSRV.getCliente(parseInt(idSeleccionado, 10)).subscribe( response => {

        const cliente: Cliente = response.data;

        this.frmCliente.controls.nombreIn.setValue(cliente.nombre);
        this.frmCliente.controls.apellidosIn.setValue(cliente.apellidos);
        this.frmCliente.controls.telefonoIn.setValue(cliente.telefono);
        this.frmCliente.controls.emailIn.setValue(cliente.email);
        this.frmCliente.controls.comentarioIn.setValue(cliente.comentario);
        $('#mdlClientes').modal('show');

      }, err => {

        this.showMdlError = true;

      });

    }

  }

  /**
   * Abre el modal para preguntar si de verdad se quieren eliminar los clientes
   */
  openAvisoBorrarClientes() {

    $('#mdlBorrar').modal('show');

  }

  /**
   * Crea un cliente si no existe o lo actualiza si ya existe
   */
  saveCliente() {


    this.statusSubmited = true;

    if (!this.frmCliente.valid) {
      return;
    }

    const clienteIn: Cliente = new Cliente();

    if (this.idsSeleccionados.length > 0) {
      clienteIn.id = this.idsSeleccionados[0];
    } else {
      clienteIn.id = null;
    }

    clienteIn.nombre = this.frmCliente.value.nombreIn;
    clienteIn.apellidos = this.frmCliente.value.apellidosIn;
    clienteIn.telefono =  this.frmCliente.value.telefonoIn;
    clienteIn.email = this.frmCliente.value.emailIn;
    clienteIn.comentario = this.frmCliente.value.comentarioIn;

    this.clientesSRV.saveCliente(clienteIn).subscribe( response => {

      const table = this.dataTable.DataTable();

      if (this.idsSeleccionados.length === 0) {
        // añadir la nueva línea al final de la tabla
        table.row.add(response.data).draw(false);
      } else {
        this.modRow(this.idsSeleccionados[0], response.data);
      }

      $('#mdlClientes').modal('hide');
    }, err => {

      this.showMdlError = true;
      $('#mdlClientes').modal('hide');
    });

  }

  /**
   * Elimina la lista de clientes seleccionados
   */
  eliminarClientes() {

    const table = this.dataTable.DataTable();

    this.clientesSRV.deleteClientes(this.idsSeleccionados).subscribe( response => {

      table.rows( ( idx, data, node ) => {

        if (this.idsSeleccionados.indexOf(data.id) > -1) {

          return true;
        }

        return false;

      } )
      .remove().draw();

      this.idsSeleccionados = [];

      $('#mdlBorrar').modal('hide');
    }, err => {

      this.showMdlError = true;
      $('#mdlBorrar').modal('hide');
    });

  }

  /**
   * Permite acceder a los campos del formulario en la vista de manera más fácil
   */
  get f() {

    return this.frmCliente.controls;

  }

  // ===================================
  // FUNCIONES PRIVADAS
  // ===================================

  /**
   * Acciones a relalizar en la funcion ready
   */
  private ready() {

    $(document).ready( () =>  {

      Inputmask().mask(document.querySelectorAll('input'));
      this.initAutonumerics();

    });

  }

  /**
   * Controla el array de ids seleccionados
   * @param id identificador del cliente seleccionado/deseleccionado
   */
  public toggleCheckId(id: string): void {

    const exists = this.idsSeleccionados.indexOf( id );

    if (exists > -1) {
      this.idsSeleccionados.splice(exists, 1);
    } else {
      this.idsSeleccionados.push(id);
    }

  }

  /**
   * Inicializa los campos autonumericos
   */
  private initAutonumerics(): void {

  }

  /**
   * Constructor del formulario de clientes
   */
  private buildForm() {
    this.frmCliente = this.formBuilder.group({
      nombreIn: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      apellidosIn: ['', [Validators.minLength(3), Validators.maxLength(64)]],
      telefonoIn: ['', [Validators.minLength(6), Validators.maxLength(12)]],
      emailIn: ['', [Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
                  Validators.minLength(6), Validators.maxLength(64)]],
      comentarioIn: ['', [Validators.maxLength(512)]],
    });
  }

  /**
   * Modifica los datos de una linea de la tabla
   * @param id
   * @param cliente
   */
  private modRow(id: any, cliente: Cliente) {

    const table = this.dataTable.DataTable();

    const row = table.rows( ( idx, data, node ) => {

      if (data.id == id) {
        return true;
      }
      return false;
    });

    table.row(row).data(cliente).draw(false);

    this.idsSeleccionados = [];
  }

}
