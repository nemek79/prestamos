import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;
  public formGroup: FormGroup;
  public modify: boolean = false;
  public loading: boolean = false;

  constructor(
    private authSRV: AuthService,
    private formBuilder: FormBuilder,
    private route: Router
  ) { }

  ngOnInit() {
    this.usuario = new Usuario();
    this.buildForm();
  }

  login(): void {

    this.modify = true;

    if (!this.checkFormulario()) {

      return;
    }

    this.usuario.username = this.formGroup.value.username;
    this.usuario.password = this.formGroup.value.password;

    this.loading = true;

    this.authSRV.login(this.usuario).subscribe( response => {


      this.authSRV.guardarUsuario(response.access_token);
      this.authSRV.guardarToken(response.access_token);

      this.loading = false;
      this.route.navigate(['/']);

    }, err => {

      if (err.error.error === 'unauthorized' || err.error.error === 'invalid_grant') {
        console.log('Las credenciales no son correctas')
        // this.Toast.fire({
        //   type: 'error',
        //   title: 'Las credenciales no son correctas'
        // });
      } else {
        console.log('Error desconocido. Por favor, póngase en contacto con el administrador de la aplicación');
        // this.Toast.fire({
        //   type: 'error',
        //   title: 'Error desconocido. Por favor, póngase en contacto con el administrador de la aplicación'
        // });
      }

      this.loading = false;
    });

  }

  public getError(controlName: string): string {

    let error = '';

    const control = this.formGroup.get(controlName);

    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
    }

    return error;
  }


  public displayCssFor(field: string|Array<string>): string {

    let classError = '';

    // this.formGroup.get(field).invalid && this.modify && (this.formGroup.get(field).touched || this.formGroup.get(field).dirty)

    if (this.formGroup.get(field).invalid && this.modify) {
      classError = 'is-invalid';
    }

    return classError;
  }

  // ===================================================
  // FUNCIONES PRIVADAS
  // ===================================================

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5), this.validatePassword]]
    });
  }

  private validatePassword(control: AbstractControl) {

    const password = control.value;

    let error = null;

    /*
    if (!password.includes('$')) {
      error = { ...error, dollar: 'needs a dollar symbol' };
    }
    if (!parseFloat(password[0])) {
      error = { ...error, number: 'must start with a number' };
    }
    */

    return error;
  }

  private checkFormulario() {

    if (this.formGroup.status === 'INVALID') {

      console.log('algún campo no es correcto');
      // this.Toast.fire({
      //   type: 'warning',
      //   title: 'Por favor resvisa el formulario, alguno de sus campos no es correcto'
      // });
      return false;
    }

    return true;

  }

}
