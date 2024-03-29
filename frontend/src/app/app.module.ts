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
import { ClienteEditComponent } from './components/cliente-edit/cliente-edit.component';
import { ClienteManagementComponent } from './components/cliente-management/cliente-management.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { MenuReseniaComponent } from './components/menu-resenia/menu-resenia.component';
import { MesaManagementComponent } from './components/mesa-management/mesa-management.component';
import { MesaComponent } from './components/mesa/mesa.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlatoManagementComponent } from './components/plato-management/plato-management.component';
import { PlatoComponent } from './components/plato/plato.component';
import { ReseniasComponent } from './components/resenias/resenias.component';
import { ReservaDetalleComponent } from './components/reserva-detalle/reserva-detalle.component';
import { ReservaManagementComponent } from './components/reserva-management/reserva-management.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { PlatoEditComponent } from './components/plato-edit/plato-edit.component';
import { CategoriaPlatoComponent } from './components/categoria-plato/categoria-plato.component';
import { CategoriaManagementComponent } from './components/categoria-management/categoria-management.component';
import { ReseniaManagementComponent } from './components/resenia-management/resenia-management.component';

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
    MenuReseniaComponent,
    ReseniasComponent,
    PlatoComponent,
    PlatoManagementComponent,
    ClienteEditComponent,
    PlatoEditComponent,
    CategoriaPlatoComponent,
    CategoriaManagementComponent,
    ReseniaManagementComponent
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
