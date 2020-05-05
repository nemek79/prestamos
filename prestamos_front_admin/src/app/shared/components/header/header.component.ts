import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  public login: string;

  constructor(
    public authSRV: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  toggleSideBar() {

    this.toggleSideBarForMe.emit();

    setTimeout( () => {
      window.dispatchEvent(new Event('resize'));
    }, 300);

  }

  cerrar_sesion() {
    this.login = null;
    this.authSRV.logout();
    this.route.navigate(['/login']);
  }

}
