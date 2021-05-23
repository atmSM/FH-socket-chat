import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styles: [
  ]
})
export class ListaUsuariosComponent implements OnInit {

  usuariosActivos$: Observable<any>;

  constructor( private chatService: ChatService ) { 
    this.usuariosActivos$ = this.chatService.getUsuariosActivos();
    this.chatService.emitirUsuariosActivos();
  }

  ngOnInit(): void {
  }

}
