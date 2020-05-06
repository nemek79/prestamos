import { Component, OnInit, ViewChild } from '@angular/core';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { InfoResponse } from 'src/app/models/inforesponse';

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

    this.prestamosSRV.getPrestamosAbiertos().subscribe( (response: InfoResponse) => {



    });

  }

}
