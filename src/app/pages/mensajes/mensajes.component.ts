import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { WebsocketsService } from '../../services/websockets.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styles: [
  ]
})
export class MensajesComponent implements OnInit {

  usuario: Usuario | null;

  constructor( private wsService: WebsocketsService ) {
    this.usuario = wsService.getUsuario();
   }

  ngOnInit(): void {
  }

  salir() {
    this.wsService.logoutWS();
  }

}
