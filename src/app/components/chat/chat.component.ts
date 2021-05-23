import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit, OnDestroy {

  texto: string = '';
  chatSubs: Subscription | undefined;
  elemento: HTMLElement | null;

  mensajes: any[] = [];

  constructor( private chatService: ChatService ) { 
    this.elemento = document.getElementById('chat-mensajes');
  }

  ngOnInit(): void {
    this.elemento = document.getElementById('chat-mensajes');

    this.chatSubs = this.chatService.getMessage().subscribe( msg => {
      this.mensajes.push( msg );

      console.log( msg );
      
      if (this.elemento) {
        setTimeout(() => {
          this.elemento!.scrollTop = this.elemento!.scrollHeight;
        }, 50);
      }
    }); 
  }

  ngOnDestroy() {
    if (!this.chatSubs) { return; }

    this.chatSubs.unsubscribe();
  }

  enviar() {
    if (this.texto.trim().length === 0) { return; }

    this.chatService.sendMessage( this.texto );
    this.texto = '';
  }

}
