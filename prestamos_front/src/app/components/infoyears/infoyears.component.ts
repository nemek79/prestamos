import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-infoyears',
  templateUrl: './infoyears.component.html',
  styleUrls: ['./infoyears.component.css']
})
export class InfoyearsComponent implements OnInit {

  public year = '2020';

  title = 'angular8chartjs';
  canvas: any;
  ctx: any;

  constructor() { }

  ngOnInit() {

    this.canvas = document.getElementById('myChart');

    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
            labels: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
            datasets: [{
                label: 'Intereses netos',
                data: [50,120,96,240,240,96,96,96,210,210,96,48],
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
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


    });
  }


  public handleClickYear(): void {


    console.log('Year: '+this.year)

  }

}
