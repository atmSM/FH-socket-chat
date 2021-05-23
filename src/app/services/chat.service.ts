import { Injectable } from '@angular/core';
import { WebsocketsService } from './websockets.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public wsService: WebsocketsService ) { }

  sendMessage( mensaje: string ) {
    const payload = {
      de: this.wsService.getUsuario()?.nombre,
      cuerpo: mensaje
    };

    this.wsService.emit( 'mensaje', payload );
  }

  getMessage() {
    return this.wsService.listen('mensaje-nuevo');
  }
  
  getMessagePrivate() {
    return this.wsService.listen('mensaje-privado');
  }

  getUsuarios() {
    return this.wsService.listen('lista-usuarios');
  }

  getUsuariosActivos() {
    return this.wsService.listen('usuarios-activos');
  }

  emitirUsuariosActivos() {
    return this.wsService.emit('obtener-usuarios');
  }
}
