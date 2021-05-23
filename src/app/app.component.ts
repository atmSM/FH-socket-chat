import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketsService } from './services/websockets.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'basico';

  mensajePrivadoSubs: Subscription;
  
  constructor( public wsService: WebsocketsService,
               public chatService: ChatService ) {
    this.mensajePrivadoSubs = this.chatService.getMessagePrivate().subscribe( msg => {
      console.log( msg );
    });
  }

  ngOnInit() {}

  ngOnDestroy(){
    this.mensajePrivadoSubs.unsubscribe();
  }
}
