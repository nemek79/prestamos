import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;
  public loading = false;

  constructor(
    public authSRV: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  login(): void {

    console.log('logueando...')

    this.loading = true;

    this.authSRV.login(this.usuario).subscribe( response => {

      this.authSRV.guardarUsuario(response.access_token);
      this.authSRV.guardarToken(response.access_token);

      this.loading = false;
      this.route.navigate(['/posts']);

      },
      err => {

        this.loading = false;
      }
    );

  }

  btnDisable(): boolean {

    if (this.usuario.username != null &&
        this.usuario.username.length >= 4 &&
        this.usuario.password != null &&
        this.usuario.password.length >= 4 ) {
          return false;
    }

    return true;
  }

}
