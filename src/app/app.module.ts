import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { 
  url: environment.wsURL, options: {} 
};

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent,
    ListaUsuariosComponent,
    LoginComponent,
    MensajesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
