import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ClienteDetalleComponent } from './components/cliente-detalle/cliente-detalle.component';

@NgModule({
  declarations: [AppComponent, ClienteComponent, HomeComponent, ReservaComponent, ClienteDetalleComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
