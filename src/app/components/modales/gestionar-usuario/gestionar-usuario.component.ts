import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataUsuario } from 'src/app/models/data-usuario.model';
import { CardsUsuariosService } from 'src/app/services/cards-usuarios.service';
import { MensajeriaService } from 'src/app/services/mensajeria.service';
import { AppComponent } from 'src/app/app.component';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-gestionar-usuario',
  templateUrl: './gestionar-usuario.component.html',
  styleUrls: ['./gestionar-usuario.component.scss']
})
export class GestionarUsuarioComponent implements OnInit {
  Form: FormGroup;
  usuario: DataUsuario;
  EsModificar: boolean = false;
  Escenario: string;

  // Cosas que cambian
  // Recibe como parametro el usuario (definir en el constructor que meta lo que reciba en this.usuario)
  // Cambiar el servicio que va a ejecutar, porque ahora es un patch/put
  // 

  constructor(private FormBuilder: FormBuilder,
    private MensajeriaService: MensajeriaService,
    private CardsUsuariosService: CardsUsuariosService,
    private dialogRef: MatDialogRef<GestionarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public UsuarioModificado: DataUsuario
  ) {
    this.usuario = UsuarioModificado ?? new DataUsuario();
    this.EsModificar = UsuarioModificado !== null;
    this.Escenario = this.EsModificar ? "Editar" : "Crear";
  }

  ngOnInit(): void {
    this.Form = this.FormBuilder.group({
      Email: [this.usuario.email, [Validators.required, Validators.email]],
      Nombre: [this.usuario.first_name, Validators.required],
      Apellido: [this.usuario.last_name, Validators.required],
      Avatar: [this.usuario.avatar, Validators.required]
    });
  }

  Submit() {

    if (!this.Form.valid) {
      this.MensajeriaService.MensajeError("No todos los datos ingresados son correctos. No se puede continuar.")
      return;
    }

    // Comprobar que es valido
    this.usuario.email = this.Correo.value;
    this.usuario.first_name = this.Nombre.value;
    this.usuario.last_name = this.Apellido.value;
    this.usuario.avatar = this.Avatar.value;

    this.CardsUsuariosService.AppComponent.ActivarBarraCarga()

    if (this.EsModificar)
      this.ModificarUsuario();
    else
      this.CrearUsuario();
  }

  CrearUsuario() {
    this.CardsUsuariosService.SolicitarCreadoApi(this.usuario).then(res => {
      if (res.status == 201)
        this.MensajeriaService.MensajeOk("El usuario se creo correctamente");
      else
        this.MensajeriaService.MensajeError("El usuario no se pudo crear...");

      this.CardsUsuariosService.AgregarUsuario(this.usuario);
      this.CardsUsuariosService.AppComponent.DesactivarBarraCarga()
      this.dialogRef.close();
    }).catch(err => {
      console.log(err);
      this.MensajeriaService.MensajeError("Hubo un problema al internar crear el usuario");
      this.CardsUsuariosService.AppComponent.DesactivarBarraCarga()
    });
  }

  ModificarUsuario() {
    this.CardsUsuariosService.SolicitarEditadoApi(this.usuario).then(res => {
      if (res.status == 200)
        this.MensajeriaService.MensajeOk("El usuario fue modificado correctamente");
      else
        this.MensajeriaService.MensajeError("El usuario no se pudo modificar...");

      this.CardsUsuariosService.EditarUsuario(this.usuario);
      this.CardsUsuariosService.AppComponent.DesactivarBarraCarga()
      this.dialogRef.close();

    }).catch(err => {
      console.log(err);
      this.MensajeriaService.MensajeError("Hubo un problema al internar editar el usuario");
      this.CardsUsuariosService.AppComponent.DesactivarBarraCarga()
    });
  }

  get Correo() {
    return this.Form.controls.Email;
  }

  get Nombre() {
    return this.Form.controls.Nombre;
  }

  get Apellido() {
    return this.Form.controls.Apellido;
  }

  get Avatar() {
    return this.Form.controls.Avatar;
  }
}
