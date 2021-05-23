import { Component } from '@angular/core';
import { WebsocketsService } from '../../services/websockets.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent {

  constructor( public wsService: WebsocketsService ) { }

}
