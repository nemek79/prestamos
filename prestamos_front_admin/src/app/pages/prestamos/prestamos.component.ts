import { Component, OnInit, ViewChild } from '@angular/core';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { InfoResponse } from 'src/app/models/inforesponse';

import { AppSettings } from 'src/app/utiles/appsettings';
import { IntermediariosService } from 'src/app/services/intermediarios.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/models/cliente';
import { Intermediario } from 'src/app/models/intermediario';
import { Prestamo } from 'src/app/models/prestamo';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EstadoPrestamo } from 'src/app/models/estadoprestamo';
import { MaestrosService } from 'src/app/services/maestros.service';
import { formatDate } from '@angular/common';

import * as Inputmask from 'inputmask';
import * as AutoNumeric from 'autonumeric';

declare var $;

declare var adminlte: any;

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss']
})
export class PrestamosComponent implements OnInit {

  @ViewChild('dataTable', {static: false}) table;
  dataTable: any;

  idsSeleccionados: string[];
  autonumerics = new Array();

  lstClientes: Cliente[] = [];
  lstIntermediarios: Intermediario[] = [];
  lstEstadosPrestamo: EstadoPrestamo[] = [];


  prestamo: Prestamo;
  public frmPrestamo: FormGroup;
  public statusSubmited = false;

  constructor(
    private prestamosSRV: PrestamosService,
    private intermediariosSRV: IntermediariosService,
    private clientesSRV: ClientesService,
    private maestrosSRV: MaestrosService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.idsSeleccionados = [];

    this.prestamo = new Prestamo();

    // Cargar los clientes
    this.getClientes();
    // Cargar los intermediarios
    this.getIntermediarios();
    // Cargar los estados
    this.getEstadosPrestamo();

    this.buildForm();

    this.prestamosSRV.getPrestamosAbiertos().subscribe( (response: InfoResponse) => {

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
          { title: 'ID', data: 'id', orderable: false, className: '', targets:  1 , class: 'number' },
          { title: 'F. INICIO', data: 'fechaIni', orderable: false, className: '', targets:  2 },
          { title: 'F. FINAL', data: 'fechaFin', orderable: false, className: '', targets:  3 },
          { title: 'IMPORTE', data: 'importe', orderable: false, className: '', targets:  4 , class: 'number'},
          { title: 'IMPORTE INI.', data: 'importeInicial', orderable: false, className: '', targets:  5 , class: 'number'},
          { title: 'INTERES', data: 'interes', orderable: false, className: '', targets:  6 , class: 'number'},
          { title: 'INTERMEDIARIO', data: 'intermediario.nombre', orderable: false, className: '', targets:  7},
          { title: 'CLIENTE', data: 'cliente.nombre', orderable: false, className: '', targets:  8},
          { title: 'ESTADO',
            data: 'estado.descripcion',
            orderable: false,
            className: '',
            targets:  9
          },
          {
            title: 'MENSUALIDAD',
            data: 'mensualidad',
            orderable: false,
            className: '',
            targets:  10 ,
            class: 'number'
          },
          { title: 'DIA', data: 'diaIntereses', orderable: false, className: '', targets:  11 , class: 'number'}
        ]

      });

      new adminlte.Layout(document).fixLayoutHeight();

      this.setOnClicksTable();

    });

    this.ready();

  }

  /**
   * Establece los onclicks de los checks de la tabla de prestamos
   */
  setOnClicksTable() {

    // const inputs  = document.querySelectorAll('input[type="checkbox"]');

    // inputs.forEach(input => {

    //   console.log(input);

    //   input.addEventListener('click', (event) => {

    //       this.toggleCheckId(input.getAttribute('value'));

    //     }
    //   );

    // });

    $('#tblPrestamos').on('change', '.chkClassName', function(event) {

      var checkedBoxes = $('#tblPrestamos :input[type="checkbox"]:checked');
      
console.log(checkedBoxes)

      // if (checkedBoxes > 0) {
      //     $('#lnkLock').show();
      //     $('#lnkDelete').show();
      // } else {
      //     $('#lnkLock').hide();
      //     $('#lnkDelete').hide();
      // }
  });


  }

  /**
   * Abre el modal de prestamos
   */
  openModalPrestamos() {

    const format = 'dd/MM/yyyy';
    const formattedDate = formatDate(new Date(), format, 'en-US');

    if (this.idsSeleccionados.length === 0) {

      this.frmPrestamo.controls.intermediarioIn.setValue( this.lstIntermediarios[0]);
      this.frmPrestamo.controls.clienteIn.setValue( this.lstClientes[0]);
      this.frmPrestamo.controls.estadoIn.setValue( this.lstEstadosPrestamo[0]);
      this.frmPrestamo.controls.fechaIniIn.setValue( formattedDate);
      this.frmPrestamo.controls.fechaFinIn.setValue( '');
      this.frmPrestamo.controls.importeIn.setValue(0);
      this.autonumerics['importe'].set(0);
      this.frmPrestamo.controls.importeInicialIn.setValue(0);
      this.autonumerics['importeInicial'].set(0);
      this.frmPrestamo.controls.interesIn.setValue(0);
      this.autonumerics['interes'].set(6);
      this.frmPrestamo.controls.diaIn.setValue(0);
      this.autonumerics['dia'].set(1);

    }

    $('#mdlPrestamos').modal('show');

  }

  /**
   * Crea un prestamos si no existe o lo actualiza si ya existe
   */
  savePrestamo() {

    this.statusSubmited = true;

    // la validación de los campos autonuméricos se debe hacer a mano
    if (this.autonumerics['importe'].get() < 100) {
      this.frmPrestamo.controls.importeIn.setErrors({ invalid: true });
    }

    if (this.autonumerics['importeInicial'].get() < 100) {
      this.frmPrestamo.controls.importeInicialIn.setErrors({ invalid: true });
    }

    if (this.autonumerics['interes'].get() < 4) {
      this.frmPrestamo.controls.interesIn.setErrors({ invalid: true });
    }

    if (!this.frmPrestamo.valid) {
      return;
    }

    let prestamoIn: Prestamo = new Prestamo();

    prestamoIn.id = this.frmPrestamo.value.id;
    prestamoIn.fechaIni = this.frmPrestamo.value.fechaIniIn;
    prestamoIn.fechaFin = this.frmPrestamo.value.fechaFinIn;
    prestamoIn.importe = this.autonumerics['importe'].get();
    prestamoIn.importeInicial = this.autonumerics['importeInicial'].get();
    prestamoIn.interes = this.autonumerics['interes'].get();

    prestamoIn.cliente = this.frmPrestamo.value.clienteIn;
    prestamoIn.intermediario = this.frmPrestamo.value.intermediarioIn;

    prestamoIn.diaIntereses = this.frmPrestamo.value.diaIn;
    prestamoIn.estado = this.frmPrestamo.value.estadoIn;

    this.prestamosSRV.savePrestamo(prestamoIn).subscribe( response => {

      const table = this.dataTable.DataTable();

      // añadir la nueva línea al final de la tabla
      table.row.add(response.data).draw(false);
      this.setOnClickTable();

    });

  }

  /**
   * Permite acceder a los campos del formulario en la vista de manera más fácil
   */
  get f() {

    return this.frmPrestamo.controls;

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
   * @param id identificador del prestamo seleccionado/deseleccionado
   */
  public toggleCheckId(id: string): void {

    console.log('TOGGLEEEEEEEEEEEEEEEE')

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

    this.autonumerics['importe'] =  new AutoNumeric('#importeIn', 0 , AppSettings.AUTONUMERIC_IMPORTES);
    this.autonumerics['importeInicial'] =  new AutoNumeric('#importeInicialIn', 0 , AppSettings.AUTONUMERIC_IMPORTES);
    this.autonumerics['interes'] =  new AutoNumeric('#interesIn', 6 , AppSettings.AUTONUMERIC_PORCENTAJE);
    this.autonumerics['dia'] =  new AutoNumeric('#diaIn', 1 , AppSettings.AUTONUMERIC_DIA_MES);

  }

  /**
   * Obtiene la lista de clientes
   */
  private getClientes() {

    this.clientesSRV.getClientes().subscribe(
      response => {
        this.lstClientes = response.data;
      }, err => {
        this.lstClientes = null;
      }
    );

  }

  /**
   * Inicializa la lista de intermediarios
   */
  private getIntermediarios() {

    this.intermediariosSRV.getIntermediarios().subscribe(
      response => {
        this.lstIntermediarios = response.data;
      }, err => {
        this.lstIntermediarios = null;
      }
    );

  }

  /**
   * Inicializa los estados de prestamo
   */
  private getEstadosPrestamo() {

    this.maestrosSRV.getEstadosPrestamo().subscribe(

      response => {
        this.lstEstadosPrestamo = response.data;
      }, err => {
        this.lstEstadosPrestamo = null;
      }

    );

  }

  /**
   * Constructor del formulario de prestamos
   */
  private buildForm() {
    this.frmPrestamo = this.formBuilder.group({
      fechaIniIn: ['', Validators.required],
      fechaFinIn: [''],
      importeIn: [''],
      importeInicialIn: [''],
      interesIn: [''],
      intermediarioIn: ['', Validators.required],
      clienteIn: [''],
      estadoIn: ['', Validators.required],
      diaIn: ['', Validators.required],
    });
  }

  /**
   * Estable el onclick para una fila
   */
  private setOnClickTable() {

    const inputs = document.querySelectorAll('input[type="checkbox"]');
    const input = inputs[inputs.length - 1];

    input.addEventListener('click', (event) => {

      this.toggleCheckId(input.getAttribute('value'));

    });

  }
}
