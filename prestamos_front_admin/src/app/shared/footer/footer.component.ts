import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public version = '0.0.2';
  public year = '2020';
  public url = 'http://vir2al.es';
  public labelUrl = 'Vir2aL';

  constructor() { }

  ngOnInit() {
  }

}
