import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;
  public loginForm: FormGroup;

  constructor(
    public authSRV: AuthService,
    private formBuilder: FormBuilder,
    private route: Router
  ) { }

  ngOnInit() {

    this.usuario = new Usuario();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      done: false
    });

  }


  public login(): void {

    this.usuario.username = this.loginForm.controls.username.value;
    this.usuario.password = this.loginForm.controls.password.value;

    this.authSRV.login(this.usuario).subscribe( response => {

      this.authSRV.guardarUsuario(response.access_token);
      this.authSRV.guardarToken(response.access_token);

      this.route.navigate(['/dashboard']);

    },
    err => {
      console.log('ERROR EN LA PETICIÓN');
      console.log(err);
    }
    );

  }

}
