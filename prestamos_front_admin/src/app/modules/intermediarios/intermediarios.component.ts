import { Component, OnInit, ViewChild } from '@angular/core';
import { Intermediario } from 'src/app/models/intermediario';
import { IntermediariosService } from 'src/app/services/intermediarios.service';
import { InfoResponse } from 'src/app/models/inforesponse';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-intermediarios',
  templateUrl: './intermediarios.component.html',
  styleUrls: ['./intermediarios.component.scss']
})
export class IntermediariosComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;
  mdlIntermediario: boolean = false; // modal de intermediarios
  msgs = [];

  selectedChecks: number[];

  @ViewChild('dataTable', {static: false}) table;
  dataTable: any;

  // intermediario seleccionado
  selectedIntermediario: Intermediario = null;

  constructor(
    private intermediariosSRV: IntermediariosService
  ) { }

  ngOnInit() {

    this.selectedIntermediario = new Intermediario();
    this.selectedChecks = [];

    this.items = [
      {label: 'Intermediarios', url: 'intermediarios', icon: 'pi pi-user-plus'}
    ];

    this.home = {icon: 'pi pi-home'};

    // Obtener la lista de intermediarios
    this.intermediariosSRV.getIntermediarios().subscribe( (response: InfoResponse) => {

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
          { title: 'COMISION', data: 'porcComision', orderable: false, className: '', targets:  4 },
          { title: 'COMENTARIO', data: 'comentario', orderable: false, className: '', targets:  5 },
          { title: 'TELEFONO', data: 'telefono', orderable: false, className: '', targets:  6 },
          { title: 'EMAIL', data: 'email', orderable: false, className: '', targets:  7},
        ]
      });

      this.loadDataEvents();
    }, err => {

      this.msgs.push({severity: 'error',
      summary: 'Error!',
      detail: 'No se han podido recuperar los datos de los intermediarios'});

      setTimeout(() => { this.releaseMensaje(); }, 5000);
    });

  }

  /**
   * Muestra el modal de intermediario
   */
  mdlIntermediarioShow(event: any): void {

    // comprobar si es modo edición o crear nuevo intermediario
    if (this.selectedChecks.length > 0) {

      // recuperar los datos del intermediario
      this.intermediariosSRV.getIntermediario(this.selectedChecks[0]).subscribe( response => {

        this.selectedIntermediario = response.data;
        this.mdlIntermediario = true;

      }, err => {

        this.msgs.push({severity: 'error',
        summary: 'Error!',
        detail: 'No se han podido recuperar los datos del intermediario'});

        setTimeout(() => { this.releaseMensaje(); }, 5000);
      }
      );

    } else {

      this.selectedIntermediario = new Intermediario();
      this.mdlIntermediario = true;

    }

  }

  /**
   * Cierra el modal de intermediario descartando los datos
   */
  discardIntermediario() {

    this.mdlIntermediario = false;
    this.selectedIntermediario = new Intermediario();

  }

  /**
   * Crear nuevo intermediario o editarlo si ya existe
   */
  saveIntermediario() {

    const table = this.dataTable.DataTable();

    this.intermediariosSRV.saveIntermediario(this.selectedIntermediario).subscribe( response => {

      if (this.selectedChecks.length === 0) {

        table.row.add(response.data).draw(false);

      } else {
        // modificar la línea editada
        this.modRow(this.selectedChecks[0], response.data);
      }

      this.mdlIntermediario = false;
      this.selectedIntermediario = new Intermediario();
      if (this.selectedChecks.length === 0) {
        this.setOnClickTable();
      }

    }, err => {

      this.msgs.push({severity: 'error',
      summary: 'Error!',
      detail: 'No se ha podido guardar el intermediario'});

      setTimeout(() => { this.releaseMensaje(); }, 5000);
    });

  }

  /**
   * Elimina los intermediarios indicados en el array de seleccionados
   */
  deleteIntermediarios() {

    const table = this.dataTable.DataTable();

    this.intermediariosSRV.deleteIntermediarios(this.selectedChecks).subscribe( response => {

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
                      detail: 'Todos los intermediarios seleccionados han sido eliminados'});

      setTimeout(() => { this.releaseMensaje(); }, 5000);

    }, err => {

      this.msgs.push({severity: 'error',
      summary: 'Error!',
      detail: 'No se ha podido eliminar el intermediario'});

      setTimeout(() => { this.releaseMensaje(); }, 5000);
    });

  }

  // ========================================
  // FUNCIONES PRIVADAS
  // ========================================

  private modRow(id: any, intermediario: Intermediario) {

    const table = this.dataTable.DataTable();

    const row = table.rows( ( idx, data, node ) => {

      if (data.id == id) {
        return true;
      }
      return false;
    });

    table.row(row).data(intermediario).draw(false);

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
   * carga eventos en general tras la carga de la tabla de intermediarios
   */
  private loadDataEvents() {

    this.setOnClicksTable();

  }

  /**
   * Establece los onclicks de los checks de la tabla de intermediarios
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

}

