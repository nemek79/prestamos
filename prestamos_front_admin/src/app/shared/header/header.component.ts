import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authSRV: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  public cerrar_sesion(): void {

    this.authSRV.logout();
    this.route.navigate(['/login']);

  }

}
