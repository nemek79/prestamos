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

  constructor(
    public authSRV: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  login(): void {

    this.authSRV.login(this.usuario).subscribe( response => {

      this.authSRV.guardarUsuario(response.access_token);
      this.authSRV.guardarToken(response.access_token);

      this.route.navigate(['/posts']);

      },
      err => {
        this.usuario = new Usuario();
        console.log('ERROR EN LA PETICIÓN');
        console.log(err);

      }
    );

  }

}
