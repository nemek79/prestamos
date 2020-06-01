import { Component, OnInit, ViewChild } from '@angular/core';

import * as Inputmask from 'inputmask';
import * as AutoNumeric from 'autonumeric';
import { Intermediario } from 'src/app/models/intermediario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IntermediariosService } from 'src/app/services/intermediarios.service';
import { InfoResponse } from 'src/app/models/inforesponse';
import { AppSettings } from 'src/app/utiles/appsettings';

declare var $;
declare var adminlte: any;

@Component({
  selector: 'app-intermediarios',
  templateUrl: './intermediarios.component.html',
  styleUrls: ['./intermediarios.component.scss']
})
export class IntermediariosComponent implements OnInit {

  @ViewChild('dataTable', {static: false}) table;
  dataTable: any;

  idsSeleccionados: string[];
  autonumerics = new Array();

  public showMdlError = false; // muestra el modal de error

  intermediario: Intermediario;
  public frmIntermediario: FormGroup;
  public statusSubmited = false;

  public cargando = false;

  public titMdlIntermediarios = '';

  constructor(
    private intermediariosSRV: IntermediariosService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.cargando = false;

    this.idsSeleccionados = [];

    this.intermediario = new Intermediario();

    this.buildForm();

    this.intermediariosSRV.getIntermediarios().subscribe( (response: InfoResponse) => {

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
          $('td input', row).unbind('click');
          $('td input', row).bind('click', () => {
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
          { title: 'INTERES', data: 'porcComision', orderable: false, className: '', targets:  6 , class: 'number'},
          { title: 'COMENTARIO', data: 'comentario', orderable: false, className: '', targets:  7 },
        ]

      });

      new adminlte.Layout(document).fixLayoutHeight();

    }, err => {

        this.showMdlError = true;
    });

    this.ready();

  }


  /**
   * Abre el modal de intermediarios
   */
  openModalIntermediarios() {

    if (this.idsSeleccionados.length === 0) {

      this.titMdlIntermediarios = 'Nuevo intermediario';

      this.frmIntermediario.controls.nombreIn.setValue('');
      this.frmIntermediario.controls.apellidosIn.setValue('');
      this.frmIntermediario.controls.telefonoIn.setValue('');
      this.frmIntermediario.controls.emailIn.setValue('');
      this.frmIntermediario.controls.comentarioIn.setValue('');
      this.frmIntermediario.controls.porcComisionIn.setValue('');
      $('#mdlIntermediarios').modal('show');

    } else {

      this.titMdlIntermediarios = 'Editar intermediario';

      const idSeleccionado = this.idsSeleccionados[0];

      this.intermediariosSRV.getIntermediario(parseInt(idSeleccionado, 10)).subscribe( response => {

        const intermediario: Intermediario = response.data;

        this.frmIntermediario.controls.nombreIn.setValue(intermediario.nombre);
        this.frmIntermediario.controls.apellidosIn.setValue(intermediario.apellidos);
        this.frmIntermediario.controls.telefonoIn.setValue(intermediario.telefono);
        this.frmIntermediario.controls.emailIn.setValue(intermediario.email);
        this.frmIntermediario.controls.comentarioIn.setValue(intermediario.comentario);
        this.frmIntermediario.controls.porcComisionIn.setValue(intermediario.porcComision);
        $('#mdlIntermediarios').modal('show');

      }, err => {

        this.showMdlError = true;

      });

    }

  }

  /**
   * Abre el modal para preguntar si de verdad se quieren eliminar los intermediarios
   */
  openAvisoBorrarIntermediarios() {

    $('#mdlBorrar').modal('show');

  }

  /**
   * Crea un intermediario si no existe o lo actualiza si ya existe
   */
  saveIntermediario() {


    this.statusSubmited = true;

    if (this.autonumerics['porcComision'].get() < 0) {
      this.frmIntermediario.controls.porcComisionIn.setErrors({ invalid: true });
    }

    if (!this.frmIntermediario.valid) {
      return;
    }

    const intermediarioIn: Intermediario = new Intermediario();

    if (this.idsSeleccionados.length > 0) {
      intermediarioIn.id = this.idsSeleccionados[0];
    } else {
      intermediarioIn.id = null;
    }

    intermediarioIn.nombre = this.frmIntermediario.value.nombreIn;
    intermediarioIn.apellidos = this.frmIntermediario.value.apellidosIn;
    intermediarioIn.telefono =  this.frmIntermediario.value.telefonoIn;
    intermediarioIn.email = this.frmIntermediario.value.emailIn;
    intermediarioIn.comentario = this.frmIntermediario.value.comentarioIn;
    intermediarioIn.porcComision = this.autonumerics['porcComision'].get();

    this.intermediariosSRV.saveIntermediario(intermediarioIn).subscribe( response => {

      const table = this.dataTable.DataTable();

      if (this.idsSeleccionados.length === 0) {
        // añadir la nueva línea al final de la tabla
        table.row.add(response.data).draw(false);
      } else {
        this.modRow(this.idsSeleccionados[0], response.data);
      }

      $('#mdlIntermediarios').modal('hide');
    }, err => {

      this.showMdlError = true;
      $('#mdlIntermediarios').modal('hide');
    });

  }

  /**
   * Elimina la lista de intermediarios seleccionados
   */
  eliminarIntermediarios() {

    const table = this.dataTable.DataTable();

    this.intermediariosSRV.deleteIntermediarios(this.idsSeleccionados).subscribe( response => {

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

    return this.frmIntermediario.controls;

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
   * @param id identificador del intermediario seleccionado/deseleccionado
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

    this.autonumerics['porcComision'] =  new AutoNumeric('#porcComisionIn', 0 , AppSettings.AUTONUMERIC_PORCENTAJE);

  }

  /**
   * Constructor del formulario de ìntermediarios
   */
  private buildForm() {
    this.frmIntermediario = this.formBuilder.group({
      nombreIn: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      apellidosIn: ['', [Validators.minLength(3), Validators.maxLength(64)]],
      telefonoIn: ['', [Validators.minLength(6), Validators.maxLength(12)]],
      emailIn: ['', [Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
                  Validators.minLength(6), Validators.maxLength(64)]],
      comentarioIn: ['', [Validators.maxLength(512)]],
      porcComisionIn: [''],
    });
  }

  /**
   * Modifica los datos de una linea de la tabla
   * @param id
   * @param intermediario
   */
  private modRow(id: any, intermediario: Intermediario) {

    const table = this.dataTable.DataTable();

    const row = table.rows( ( idx, data, node ) => {

      if (data.id == id) {
        return true;
      }
      return false;
    });

    table.row(row).data(intermediario).draw(false);

    this.idsSeleccionados = [];
  }
}

