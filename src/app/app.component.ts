import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prueba-frontend';
  PaginaActiva: number = 1;

  public setPaginaActiva(arg: number) {
    this.PaginaActiva = arg;
  }

  comprobarPaginaActiva(arg: number): boolean {
    return this.PaginaActiva == arg;
  }
}
