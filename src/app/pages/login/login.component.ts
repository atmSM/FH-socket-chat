import { Component, OnInit } from '@angular/core';
import { WebsocketsService } from '../../services/websockets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  nombre: string = '';

  constructor( public wsService: WebsocketsService,
               private router: Router ) { }

  ngOnInit(): void {
  }

  login() {
    if ( this.nombre.trim().length === 0 ) { return; }
    
    this.wsService.loginWS( this.nombre ).then( resp => {
      this.router.navigateByUrl('/mensajes');
    });
    this.nombre = '';
  }

}
