import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;
  public formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
