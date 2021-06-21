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

    constructor(private FormBuilder: FormBuilder, private RegisterService: RegisterService, private MensajeriaService: MensajeriaService, private AppComponent: AppComponent) {
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
            this.AppComponent.ActivarBarraCarga()
            this.ContinuarProcesoRegistro();
        } else {
            this.MensajeriaService.MensajeError("El email o la contraseña son incorrectas. No se puede continuar.")
        }
    }

    ContinuarProcesoRegistro(): void {
        let arg: Usuario = new Usuario();
        arg.email = this.Form.value.Email;
        arg.password = this.Form.value.Password;

        this.RegisterService.SolicitarRegistroApi(arg).then(() => {
            this.MensajeriaService.MensajeOk("Registro Exitoso");
            this.AppComponent.DesactivarBarraCarga()
        }).catch(err => {
            if (err.status == 400)
                this.MensajeriaService.MensajeError("Hubo un problema al crear el usuario.", "solo puede ingresar con 'eve.holt@reqres.in'");

            this.AppComponent.DesactivarBarraCarga()
        });
    }

}