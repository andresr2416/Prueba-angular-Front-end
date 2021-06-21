import { Component, OnInit } from '@angular/core';
import { DataUsuario } from 'src/app/models/data-usuario.model';
import { CardsUsuariosService } from 'src/app/services/cards-usuarios.service';

@Component({
  selector: 'app-visualizar-usuario',
  templateUrl: './visualizar-usuario.component.html',
  styleUrls: ['./visualizar-usuario.component.scss']
})
export class VisualizarUsuarioComponent implements OnInit {

  item: DataUsuario;

  constructor(private CardUsuariosService:CardsUsuariosService) { 
    this.item = this.CardUsuariosService.UsuarioSeleccionado;
  }

  ngOnInit(): void {
  }

}
