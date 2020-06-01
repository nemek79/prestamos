import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;
  public loginForm: FormGroup;
  public error: string = null;
  public loading: boolean = false;

  constructor(
    public authSRV: AuthService,
    private formBuilder: FormBuilder,
    private route: Router
  ) {

  }

  ngOnInit() {

    this.error = null;

    if (this.authSRV.isAuthenticated()) {
      this.route.navigate(['/dashboard']);
    }

    this.usuario = new Usuario();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      done: false
    });

  }


  public login(): void {

    this.error = null;

    this.usuario.username = this.loginForm.controls.username.value.toLowerCase();
    this.usuario.password = this.loginForm.controls.password.value;

    this.loading = true;

    this.authSRV.login(this.usuario).subscribe( response => {

      this.authSRV.guardarUsuario(response.access_token);
      this.authSRV.guardarToken(response.access_token);

      this.loading = false;
      this.route.navigate(['/dashboard']);

    },
    err => {
      console.log(err)
      if (err.error.error === 'unauthorized' || err.error.error === 'invalid_grant') {
        this.error = 'Las credenciales no son correctas';
      } else {
        this.error = 'Error desconocido. Por favor, póngase en contacto con el administrador de la aplicación';
      }
      this.loading = false;
    });

  }

}
