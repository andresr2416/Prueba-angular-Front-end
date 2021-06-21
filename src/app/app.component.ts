import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prueba-frontend';
  PaginaActiva: number = 1;
  status = "determinate"
  fn: Function;
  clicked: boolean;

  public Ejecutar(fn: Function) {
    this.clicked = true;
    fn();
  }

  public setPaginaActiva(arg: number) {
    this.PaginaActiva = arg;
  }

  public setStatus(arg: string) {
    this.status = arg;
  }

  comprobarPaginaActiva(arg: number): boolean {
    return this.PaginaActiva == arg;
  }
}
