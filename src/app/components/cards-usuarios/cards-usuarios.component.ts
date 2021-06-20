import { Component, OnInit } from '@angular/core';
import { CardsResponse } from 'src/app/models/cards-response.model';
import { CardsUsuariosService } from 'src/app/services/cards-usuarios.service';

@Component({
  selector: 'app-cards-usuarios',
  templateUrl: './cards-usuarios.component.html',
  styleUrls: ['./cards-usuarios.component.scss']
})
export class CardsUsuariosComponent implements OnInit {

  constructor(private CardsUsuariosService:CardsUsuariosService) { 

     this.CardsUsuariosService.SolicitarUsuariosApi().then(response=>{
      this.items = response;
      console.log(response);
     }) 
   }

  ngOnInit(): void {
  }

  items: CardsResponse;
}
