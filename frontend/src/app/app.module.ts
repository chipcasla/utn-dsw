import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteDetalleComponent } from './components/cliente-detalle/cliente-detalle.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MesaComponent } from './components/mesa/mesa.component';
import { ReservaDetalleComponent } from './components/reserva-detalle/reserva-detalle.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { MesaManagementComponent } from './components/mesa-management/mesa-management.component';
import { ClienteManagementComponent } from './components/cliente-management/cliente-management.component';
import { ReservaManagementComponent } from './components/reserva-management/reserva-management.component';
import { MenuReseniaComponent } from './components/menu-resenia/menu-resenia.component'
import { ReseniasComponent } from './components/resenias/resenias.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    HomeComponent,
    ReservaComponent,
    ClienteDetalleComponent,
    LoginComponent,
    MesaComponent,
    SignInComponent,
    ReservaDetalleComponent,
    MenuAdminComponent,
    MesaManagementComponent,
    ClienteManagementComponent,
    ReservaManagementComponent,
    MenuReseniaComponent,
    ReseniasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
