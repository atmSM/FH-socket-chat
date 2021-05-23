import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  public socketStatus: boolean = false;
  private usuario: Usuario | null = null;

  constructor( private socket: Socket, 
               private router: Router ) { 
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log( 'Conectado al Servidor' );
      this.socketStatus = true;
      this.cargarStorage();
    });
    
    this.socket.on('disconnect', () => {
      console.log( 'Desconectado del Servidor' );
      this.socketStatus = false;
    });
  }

  emit( evento: string, payload?: any, callback?: Function ) {

    // emit('EVENTO', payload, callback?)
    // 'EVENTO' --> es el evento que queremos emitir
    // payload  --> es la información que queremos enviar (opcional), suele ser un objeto.
    // callback --> es algo que queremos que se haga después de que se ejecute todo el código (opcional).
    this.socket.emit( evento, payload, callback );

  }

  listen( evento: string ) {
    return this.socket.fromEvent( evento );
  }

  loginWS( nombre: string ) {
    return new Promise( (resolve, reject) => {
      this.emit( 'configurar-usuario', { nombre }, ( resp: any ) => {
        if ( resp.ok ) {
          this.usuario = new Usuario( nombre );
          this.guardarStorage();

          resolve(resp);
        } else {
          reject(resp);
        }
      } );
    });
  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('user');

    const payload = {
      nombre: 'sin-nombre'
    };

    this.emit( 'configurar-usuario', payload, () => {} );
    this.router.navigateByUrl('/');
  }

  getUsuario(){
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('user', JSON.stringify( this.usuario ));
  }

  cargarStorage() {
    if ( !localStorage.getItem('user') ) {
      this.usuario = null;
      return;
    }
    this.usuario = JSON.parse( localStorage.getItem('user')! );
    this.loginWS( this.usuario!.nombre );
  }
}
