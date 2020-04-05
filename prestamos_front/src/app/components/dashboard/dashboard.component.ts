import { InfoResponse } from './../../models/inforesponse';
import { PrestamosService } from './../../services/prestamos.service';
import { Component, OnInit } from '@angular/core';
import { Prestamo } from 'src/app/models/prestamo';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public lstPrestamos: Prestamo[];

  constructor(
    private prestamosSRV: PrestamosService,
    private authSRV: AuthService,
    private route: Router
  ) { }

  ngOnInit() {

    if (!this.authSRV.isAuthenticated()) {
      this.route.navigate(['/login']);
    }

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

}
