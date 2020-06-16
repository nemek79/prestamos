import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'
import { PrestamosService } from 'src/app/services/prestamos.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infoyears',
  templateUrl: './infoyears.component.html',
  styleUrls: ['./infoyears.component.css']
})
export class InfoyearsComponent implements OnInit {

  public loading = false;
  public year = '2020';
  public total: number = 0;

  canvas: any;
  ctx: any;
  info: number[];
  chartMonths: any;

  private  options: {
    xAxisID: 'Meses',
    responsive: true,
    display:true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true
      }],
      yAxes: [{
        display: true
      }],
    }
  }

  constructor(
    private prestamosSRV: PrestamosService,
    private authSRV: AuthService,
    private route: Router
  ) { }

  ngOnInit() {


    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');


    this.chartMonths = new Chart(this.ctx, {
        type: 'bar',
        data: {
            labels: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
            datasets: [{
                label: 'Intereses netos',
                data: this.info,
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
      options: this.options
    });

    this.getInfoFromBD(this.year);
  }


  public handleClickYear(): void {

    this.getInfoFromBD(this.year);

  }


  /**
   *
   * @param year Obtiene los datos a mostrar en la pantalla del back
   */
  private getInfoFromBD(year:string) {

    this.prestamosSRV.getInfoYear(year).subscribe( response => {

      this.info = [];

      for(var key in response)
      {
        if (Number.parseInt(key) > 13) {
          this.total = response[key]
        } else {
          this.info.push(response[key])
        }

      }

      this.chartMonths.data.datasets[0].data = this.info;
      this.chartMonths.update();

      this.loading = false;
    });

  }

}
