import { Component, OnInit } from '@angular/core';
import { CardsUsuariosService } from 'src/app/services/cards-usuarios.service';
import { MensajeriaService } from 'src/app/services/mensajeria.service';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material/dialog';
import { VisualizarUsuarioComponent } from '../modales/visualizar-usuario/visualizar-usuario.component';
import { GestionarUsuarioComponent } from '../modales/gestionar-usuario/gestionar-usuario.component';
import { DataUsuario } from 'src/app/models/data-usuario.model';

@Component({
  selector: 'app-cards-usuarios',
  templateUrl: './cards-usuarios.component.html',
  styleUrls: ['./cards-usuarios.component.scss']
})
export class CardsUsuariosComponent implements OnInit {
  Usuarios: DataUsuario[] = [];

  constructor(private CardsUsuariosService: CardsUsuariosService, private MensajeriaService: MensajeriaService, private AppComponent: AppComponent, public dialog: MatDialog) {
    AppComponent.setPaginaActiva(3);
    AppComponent.fn = this.InsertarUsuario(this);

    this.CardsUsuariosService.SolicitarUsuariosApi().then(response => {
      this.CardsUsuariosService.ListaUsuarios = response;
      this.Usuarios = response.data;
    });

    this.CardsUsuariosService.AppComponent = AppComponent;
  }

  ngOnInit(): void { }

  VisualizarUsuario(arg: number) {
    this.CardsUsuariosService.UsuarioSeleccionado = this.EncontrarUsuario(arg);
    this.dialog.open(VisualizarUsuarioComponent, {
      width: '20%',
      minWidth: '100px',
      height: '40%'
    });
    this.CardsUsuariosService.UsuarioSeleccionado = null;
  }

  BorrarUsuario(arg: number) {
    this.AppComponent.ActivarBarraCarga()
    this.MensajeriaService.MensajeConfirmar("Desea borrar el usuario?").then(r => {
      if (r.isConfirmed)
        this.ContinuarBorradoUsuario(arg);
      else
        this.AppComponent.DesactivarBarraCarga()
    });
  }

  ContinuarBorradoUsuario(arg: number) {
    this.CardsUsuariosService.SolicitarBorradoApi(arg).then(res => {
      if (res.status == 204) {
        this.MensajeriaService.MensajeOk("El usuario se elimino correctamente");
        this.BorrarUsuarioLista(arg);
      }
      else {
        this.MensajeriaService.MensajeError("No se pudo eliminar el usuario...");
      }

      this.AppComponent.DesactivarBarraCarga()
    }).catch(() => {
      this.MensajeriaService.MensajeError("Hubo un problema al internar eliminar el usuario");
      this.AppComponent.DesactivarBarraCarga()
    });
  }

  BorrarUsuarioLista(arg: number) {
    this.CardsUsuariosService.ListaUsuarios.data = this.CardsUsuariosService.ListaUsuarios.data.filter(x => !(x.id == arg));
    this.Usuarios = this.CardsUsuariosService.ListaUsuarios.data;
  }

  EditarUsuario(arg: number) {
    let Usuario: DataUsuario = this.EncontrarUsuario(arg);

    this.dialog.open(GestionarUsuarioComponent, {
      width: '30%',
      height: '50%',
      data: Usuario
    });
  }

  EncontrarUsuario(arg: number): DataUsuario {
    return this.CardsUsuariosService.ListaUsuarios.data.find(x => x.id == arg);
  }

  InsertarUsuario(contexto: any): Function {
    return function () {
      if (contexto.AppComponent.clicked) {
        contexto.dialog.open(GestionarUsuarioComponent, {
          width: '30%',
          height: '50%'
        });
      }
    }
  }

}
