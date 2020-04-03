import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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


  public login(): void {

    this.usuario.username = 'admin';
    this.usuario.password = 'alamierda';

    this.authSRV.login(this.usuario).subscribe( response => {

      this.authSRV.guardarUsuario(response.access_token);
      this.authSRV.guardarToken(response.access_token);

      this.route.navigate(['/dashboard']);

    });

  }

}
