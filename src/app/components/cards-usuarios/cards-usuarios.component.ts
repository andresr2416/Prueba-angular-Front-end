import { Component, OnInit } from '@angular/core';
import { CardsResponse } from 'src/app/models/cards-response.model';
import { CardsUsuariosService } from 'src/app/services/cards-usuarios.service';
import { MensajeriaService } from 'src/app/services/mensajeria.service';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material/dialog';
import { VisualizarUsuarioComponent } from '../modales/visualizar-usuario/visualizar-usuario.component';
import { GestionarUsuarioComponent } from '../modales/gestionar-usuario/gestionar-usuario.component';


@Component({
  selector: 'app-cards-usuarios',
  templateUrl: './cards-usuarios.component.html',
  styleUrls: ['./cards-usuarios.component.scss']
})
export class CardsUsuariosComponent implements OnInit {
  Usuarios: CardsResponse = new CardsResponse();

  constructor(private CardsUsuariosService: CardsUsuariosService, private MensajeriaService: MensajeriaService, private AppComponent: AppComponent, public dialog: MatDialog) {
    AppComponent.setPaginaActiva(3);
    AppComponent.fn = this.Test(this);

    this.CardsUsuariosService.SolicitarUsuariosApi().then(response => {
      this.Usuarios = response;
    })
  }

  ngOnInit(): void {
  }

  VisualizarUsuario(arg: number) {
    this.CardsUsuariosService.UsuarioSeleccionado = this.Usuarios.data.find(x => x.id == arg);
    this.dialog.open(VisualizarUsuarioComponent, {
      width: '15%',
      height: '40%'
    });
  }

  BorrarUsuario(arg: number) {
    this.AppComponent.setStatus("indeterminate");
    this.MensajeriaService.MensajeConfirmar("Desea borrar el usuario?").then(r => {
      if (r.isConfirmed)
        this.ContinuarBorradoUsuario(arg);
      else
        this.AppComponent.setStatus("determinate");
    });
  }

  ContinuarBorradoUsuario(arg: number) {
    this.CardsUsuariosService.SolicitarBorradoApi(arg).then(r => {
      if (r.status == 204) {
        this.MensajeriaService.MensajeOk("Se elimino correctamente");
        this.BorrarUsuarioLista(arg);
      }
      else {
        this.MensajeriaService.MensajeError("No se pudo eliminar");
      }

      this.AppComponent.setStatus("determinate");
    }).catch(() => {
      this.MensajeriaService.MensajeError("Hubo un problema al internar eliminar el usuario");
      this.AppComponent.setStatus("determinate");
    });
  }

  BorrarUsuarioLista(arg: number) {

    this.Usuarios.data = this.Usuarios.data.filter(x => !(x.id == arg));

  }

  Test(miau: any): Function {
    return function () {
      if (miau.AppComponent.clicked) {
        miau.dialog.open(GestionarUsuarioComponent, {
          width: '30%',
          height: '50%'
        });
      }
    }
  }
}
