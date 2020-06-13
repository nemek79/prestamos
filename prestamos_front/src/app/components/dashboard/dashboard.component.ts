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

  public info: any;
  public loading = true;

  constructor(
    private prestamosSRV: PrestamosService,
    private authSRV: AuthService,
    private route: Router
  ) { }

  ngOnInit() {

    this.loading = true;

    this.prestamosSRV.getDashboardInfo().subscribe( (response: InfoResponse) => {

      this.info = response.data;
      this.loading = false;

    });

  }

  goToPrestamosActivos(){
    console.log('navigate prestamos')
    this.route.navigate(['prestamos']);
  }

}
