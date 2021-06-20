import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { MensajeriaService } from 'src/app/services/mensajeria.service';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
    Form: FormGroup;

    constructor(private FormBuilder: FormBuilder, private RegisterService: RegisterService, private MensajesService: MensajeriaService, private AppComponent: AppComponent) {
        AppComponent.setPaginaActiva(2);
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

    Registrar() {

        if (this.Form.valid) {
            this.ContinuarProcesoRegistro();
        } else {
            this.MensajesService.MensajeError("El email o la contraseña son incorrectas. No se puede continuar.")
        }
    }

    ContinuarProcesoRegistro(): void {
        let arg: Usuario = new Usuario();
        arg.email = "eve.holt@reqres.in";
        arg.password = "pistol";

        this.RegisterService.SolicitarRegistroApi(arg).then(response => {
            console.log(response);
            this.MensajesService.MensajeOk("Registro Exitoso");
        }).catch(() => {
            this.MensajesService.MensajeError("Hubo un problema al solicitar la funcionalidad. No se puede continuar.")
        });
    }

}