import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { DataUsuario } from 'src/app/models/data-usuario.model';
import { CardsUsuariosService } from 'src/app/services/cards-usuarios.service';

@Component({
  selector: 'app-gestionar-usuario',
  templateUrl: './gestionar-usuario.component.html',
  styleUrls: ['./gestionar-usuario.component.scss']
})
export class GestionarUsuarioComponent implements OnInit {
  Form: FormGroup;
  item: DataUsuario = new DataUsuario();
  Escenario: string = "";
  imagenCorrecta: boolean = false;

  constructor(private FormBuilder: FormBuilder, private CardsUsuariosService: CardsUsuariosService) { }

  ngOnInit(): void {
    this.Form = this.FormBuilder.group({
      Email: [this.item.email, [Validators.required, Validators.email]],
      Nombre: [this.item.first_name, Validators.required],
      Apellido: [this.item.last_name, Validators.required],
      Avatar: [this.item.avatar, Validators.required]
    });
  }

  Login() {

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
