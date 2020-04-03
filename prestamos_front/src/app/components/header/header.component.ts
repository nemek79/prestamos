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

    this.login = this.authSRV.getUsuario().username;

  }

  public cerrar_sesion(): void {

    this.authSRV.logout();
    this.route.navigate(['/login']);

  }

}
