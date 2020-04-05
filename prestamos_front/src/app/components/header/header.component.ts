import { Usuario } from './../../models/usuario';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public login: string;

  constructor(
    public authSRV: AuthService,
    private route: Router
  ) { }

  ngOnInit() {

  }

  public cerrar_sesion(): void {

    this.login = null;
    this.authSRV.logout();
    this.route.navigate(['/login']);

  }

}
