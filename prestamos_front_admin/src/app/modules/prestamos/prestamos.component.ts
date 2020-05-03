import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoResponse } from 'src/app/models/inforesponse';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { Prestamo } from 'src/app/models/prestamo';
import { MenuItem } from 'primeng/api/menuitem';
import { PrestamoInput } from 'src/app/models/prestamoInput';
import { Cliente } from 'src/app/models/cliente';
import { Intermediario } from 'src/app/models/intermediario';
import { ClientesService } from 'src/app/services/clientes.service';
import { IntermediariosService } from 'src/app/services/intermediarios.service';
import { EstadoPrestamo } from 'src/app/models/estadoprestamo';
import { HelperService } from 'src/app/services/helper.service';

declare var $;

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss']
})
export class PrestamosComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  mdlPrestamo: boolean = false; // modal de crear un nuevo Prestamo
  msgs = [];
  lstClientes: Cliente[] = [];
  lstIntermediarios: Intermediario[] = [];

  selectedChecks: number[];

  @ViewChild('dataTable', {static: false}) table;
  dataTable: any;

  // prestamo seleccionado
  selectedPrestamo: PrestamoInput = null;

  constructor(
    private prestamosSRV: PrestamosService,
    private intermediariosSRV: IntermediariosService,
    private clientesSRV: ClientesService,
    private helperSRV: HelperService
  ) { }


  ngOnInit() {

    this.selectedPrestamo = new PrestamoInput();
    this.selectedChecks = [];

    // Precargamos los clientes y los intermediarios
    this.getClientes();
    this.getIntermediarios();

    this.items = [
      {label: 'Prestamos', url: 'prestamos', icon: 'pi pi-id-card'}
    ];

    this.home = {icon: 'pi pi-home'};

    // Obtener la lista de prestamos
    this.prestamosSRV.getPrestamosAbiertos().subscribe( (response: InfoResponse) => {

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
          { title: 'F. INICIO', data: 'fechaIni', orderable: false, className: '', targets:  2 },
          { title: 'F. FINAL', data: 'fechaFin', orderable: false, className: '', targets:  3 },
          { title: 'IMPORTE', data: 'importe', orderable: false, className: '', targets:  4 },
          { title: 'IMPORTE INI.', data: 'importeInicial', orderable: false, className: '', targets:  5 },
          { title: 'INTERES', data: 'interes', orderable: false, className: '', targets:  6 },
          { title: 'INTERMEDIARIO', data: 'intermediario.nombre', orderable: false, className: '', targets:  7},
          { title: 'CLIENTE', data: 'cliente.nombre', orderable: false, className: '', targets:  8},
          { title: 'ESTADO', data: 'estado.descripcion', orderable: false, className: '', targets:  9},
          { title: 'MENSUALIDAD', data: 'mensualidad', orderable: false, className: '', targets:  10},
          { title: 'DIA', data: 'diaIntereses', orderable: false, className: '', targets:  11}
        ]
      });

      this.loadDataEvents();
    }, err => {

      this.msgs.push({severity: 'error',
      summary: 'Error!',
      detail: 'No se han podido recuperar los datos de los prestamos'});

      setTimeout(() => { this.releaseMensaje(); }, 5000);
    });

  }

  /**
   * Muestra el modal de prestamo
   */
  mdlPrestamoShow(event: any): void {

    // comprobar si es modo edición o crear nuevo prestamo
    if (this.selectedChecks.length > 0) {

      // recuperar los datos del prestamo
      this.prestamosSRV.getPrestamo(this.selectedChecks[0]).subscribe( response => {

        let prestamo: Prestamo = new Prestamo();

        prestamo =  response.data;

        this.selectedPrestamo = this.helperSRV.prestamoToInput(prestamo);
        this.mdlPrestamo = true;

      }, err => {

        this.msgs.push({severity: 'error',
        summary: 'Error!',
        detail: 'No se han podido recuperar los datos del prestamo'});

        setTimeout(() => { this.releaseMensaje(); }, 5000);
      }
      );

    } else {

      this.selectedPrestamo = new PrestamoInput();
      this.selectedPrestamo.cliente = this.lstClientes[0];
      this.selectedPrestamo.intermediario = this.lstIntermediarios[0];
      this.mdlPrestamo = true;

    }

  }

  /**
   * Cierra el modal de prestamo descartando los datos
   */
  discardPrestamo() {

    this.mdlPrestamo = false;
    this.selectedPrestamo = new PrestamoInput();

  }

  /**
   * Crear nuevo prestamo o editarlo si ya existe
   */
  savePrestamo() {

    debugger;

    const table = this.dataTable.DataTable();

    const prestamo: Prestamo = this.helperSRV.inputToPrestamo(this.selectedPrestamo);

    if (prestamo.id == null) {

      // Estamos creando un nuevo prestamo

      // El estado es pendiente
      let estado: EstadoPrestamo = new EstadoPrestamo();

      estado.id = '1';
      estado.descripcion = 'Pendiente';
      prestamo.estado = estado;
    }

    this.prestamosSRV.savePrestamo(prestamo).subscribe( response => {

      if (this.selectedChecks.length === 0) {

        table.row.add(response.data).draw(false);

      } else {
        // modificar la línea editada
        console.log(response.data)
        this.modRow(this.selectedChecks[0], response.data);
      }

      this.mdlPrestamo = false;
      this.selectedPrestamo = new PrestamoInput();
      if (this.selectedChecks.length === 0) {
        this.setOnClickTable();
      }

    }, err => {

      this.msgs.push({severity: 'error',
      summary: 'Error!',
      detail: 'No se ha podido guardar el prestamo'});

      setTimeout(() => { this.releaseMensaje(); }, 5000);
    });

  }

  /**
   * Elimina los prestamos indicados en el array de seleccionados
   */
  deletePrestamos() {

    const table = this.dataTable.DataTable();

    this.prestamosSRV.deletePrestamos(this.selectedChecks).subscribe( response => {

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
                      detail: 'Todos los prestamos seleccionados han sido eliminados'});

      setTimeout(() => { this.releaseMensaje(); }, 5000);

    }, err => {

      this.msgs.push({severity: 'error',
      summary: 'Error!',
      detail: 'No se ha podido eliminar el prestamo'});

      setTimeout(() => { this.releaseMensaje(); }, 5000);
    });

  }

  // ========================================
  // FUNCIONES PRIVADAS
  // ========================================

  private modRow(id: any, prestamo: Prestamo) {

    const table = this.dataTable.DataTable();

    const row = table.rows( ( idx, data, node ) => {

      if (data.id == id) {
        return true;
      }
      return false;
    });

    table.row(row).data(Prestamo).draw(false);

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
   * carga eventos en general tras la carga de la tabla de prestamos
   */
  private loadDataEvents() {

    this.setOnClicksTable();

  }

  /**
   * Establece los onclicks de los checks de la tabla de prestamos
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

    });

  }

  private releaseMensaje() {

    this.msgs = [];

  }

  private getIntermediarios() {

    this.intermediariosSRV.getIntermediarios().subscribe(
      response => {
        this.lstIntermediarios = response.data;

      }, err => {
        this.lstIntermediarios = null;
      }
    );

  }

  private getClientes() {

    this.clientesSRV.getClientes().subscribe(
      response => {
        this.lstClientes = response.data;
      }, err => {
        this.lstClientes = null;
      }
    );

  }


}
