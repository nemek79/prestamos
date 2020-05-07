import { Component, OnInit, ViewChild } from '@angular/core';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { InfoResponse } from 'src/app/models/inforesponse';

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

  constructor(
    private prestamosSRV: PrestamosService,
  ) { }

  ngOnInit() {


    const altura_pantalla = $(window).height();
    const obj = $("#divID");

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

    });

    new adminlte.Layout(document).fixLayoutHeight();

  }

}
