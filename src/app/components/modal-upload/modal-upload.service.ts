import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  private _oculto: string = 'oculto';

  // Emitir el valor
  public notificacion = new EventEmitter<any>();

  constructor() {}

  get oculto(): string {
    return this._oculto;
  }

  set oculto( valor: string ) {
    this._oculto = valor;
  }

  ocultarModal() {
    this.id = null;
    this.tipo = null;
    this._oculto = 'oculto';
  }

  mostrarModal(tipo: string, id: string) {
    this.id = id;
    this.tipo = tipo;
    this._oculto = '';
  }

}
