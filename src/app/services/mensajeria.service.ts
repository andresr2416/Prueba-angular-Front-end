import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {

  constructor() { }

  MensajeError(mensaje: string, footer: string = null): void {
    Swal.fire(this.DesactivarAltoAutomatico({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      footer: footer,
    }));
  }

  MensajeOk(mensaje: string): void {
    Swal.fire(this.DesactivarAltoAutomatico({
      icon: 'success',
      title: 'Proceso finalizado de manera exitosa',
      text: mensaje,

    }));
  }

  DesactivarAltoAutomatico(arg: any) {
    return { heightAuto: false, ...arg };
  }

}
