import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { ClienteDetalleComponent } from './components/cliente-detalle/cliente-detalle.component';
import { ClienteManagementComponent } from './components/cliente-management/cliente-management.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { MesaManagementComponent } from './components/mesa-management/mesa-management.component';
import { MesaComponent } from './components/mesa/mesa.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReservaDetalleComponent } from './components/reserva-detalle/reserva-detalle.component';
import { ReservaManagementComponent } from './components/reserva-management/reserva-management.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';

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
    SpinnerComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
