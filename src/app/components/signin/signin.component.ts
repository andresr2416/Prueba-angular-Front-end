import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/services/signin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MensajeriaService } from 'src/app/services/mensajeria.service';
import { Usuario } from 'src/app/models/usuario.model';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  Form: FormGroup;

  constructor(private FormBuilder: FormBuilder, private SigninService: SigninService, private MensajeriaService: MensajeriaService, private AppComponent: AppComponent) {
    AppComponent.setPaginaActiva(1);
  }

  ngOnInit() {
    this.Form = this.FormBuilder.group({
      Email: [null, [Validators.required, Validators.email]],
      Password: [null, Validators.required]
    });
  }
  get Correo() {
    return this.Form.controls.Email;
  }

  get Contrasena() {
    return this.Form.controls.Password;
  }

  Login() {

    if (this.Form.valid) {
      this.AppComponent.setStatus("indeterminate");
      this.ContinuarSignIn();
    } else {
      this.MensajeriaService.MensajeError("El email o la contraseña son incorrectas. No se puede continuar.")
    }
  }

  ContinuarSignIn() {
    let arg: Usuario = new Usuario();
    arg.email = this.Form.value.Email;
    arg.password = this.Form.value.Password;

    this.SigninService.SolicitarLoginApi(arg).then(response => {
      this.MensajeriaService.MensajeOk("Registro Exitoso");
      this.AppComponent.setStatus("determinate");

    }).catch(err => {
      if (err.status == 400)
        this.MensajeriaService.MensajeError("No existe el usuario. No se puede continuar.", "solo puede ingresar con 'eve.holt@reqres.in'")

      this.AppComponent.setStatus("determinate");
    });
  }
}
