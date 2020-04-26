import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-infocard',
  templateUrl: './infocard.component.html',
  styleUrls: ['./infocard.component.scss']
})
export class InfocardComponent implements OnInit {

  @Input() label: string;
  @Input() data: string;
  @Input() state: string;

  chartOptions: {

  };

  constructor() { }

  ngOnInit() {
  }

  getDataClasses(): string {

    return this.state;
  }

}
