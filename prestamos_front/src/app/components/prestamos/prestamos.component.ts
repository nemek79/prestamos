import { InfoResponse } from './../../models/inforesponse';
import { PrestamosService } from './../../services/prestamos.service';
import { Component, OnInit } from '@angular/core';
import { Prestamo } from 'src/app/models/prestamo';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  public lstPrestamos: Prestamo[];
  public showMdlComentario: boolean;
  public comentarioPrestamoId: number;
  public comentarioInput: string;

  constructor(
    private prestamosSRV: PrestamosService,
    private authSRV: AuthService,
    private route: Router
  ) { }

  ngOnInit() {

    this.showMdlComentario = false;
    this.comentarioPrestamoId = null;

    this.prestamosSRV.getPrestamosAbiertos().subscribe( (response: InfoResponse) => {

      this.lstPrestamos = response.data;

    });

  }

  public setPagado(prestamosId: number): void {

      this.prestamosSRV.setPrestamoMensualidadPagado(prestamosId)
        .subscribe( (response: InfoResponse) => {

          location.reload();

      });

  }

  public showComentario(prestamoId) {

    this.comentarioPrestamoId = prestamoId;
    this.showMdlComentario = true;

  }

  public saveComentario() {

    if (!this.comentarioInput || this.comentarioInput.length <= 2) {
      return;
    }

    this.prestamosSRV.createComentario(this.comentarioPrestamoId, this.comentarioInput)
      .subscribe( (response: InfoResponse) => {
        this.hideComentario();
      });

  }

  public hideComentario() {

    this.showMdlComentario = false;
    this.comentarioPrestamoId = null;
    this.comentarioInput = null;

  }

}
