import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDetalleComponent } from './components/cliente-detalle/cliente-detalle.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MesaComponent } from './components/mesa/mesa.component';
import { ReservaDetalleComponent } from './components/reserva-detalle/reserva-detalle.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { authGuard } from './guards/auth.guard';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { MesaManagementComponent } from './components/mesa-management/mesa-management.component';
import { ClienteManagementComponent } from './components/cliente-management/cliente-management.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ReservaManagementComponent } from './components/reserva-management/reserva-management.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'reservas', component: ReservaComponent, canActivate: [authGuard] },
  {
    path: 'reservas/:id',
    component: ReservaDetalleComponent,
    canActivate: [authGuard],
  },
  {
    path: 'misdatos',
    component: ClienteDetalleComponent,
    canActivate: [authGuard],
  },
  {
    path: 'nuevaReserva',
    component: MesaComponent,
    canActivate: [authGuard],
  },

  { path: 'registro', component: SignInComponent},

  { path: 'admin', component: MenuAdminComponent},
  { path: 'admin/mesas', component: MesaManagementComponent},
  { path: 'admin/clientes', component: ClienteManagementComponent},
  { path: 'admin/reservas', component: ReservaManagementComponent},
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
