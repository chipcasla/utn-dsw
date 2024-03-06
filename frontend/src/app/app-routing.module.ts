import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ClienteDetalleComponent } from './components/cliente-detalle/cliente-detalle.component';
import { ClienteEditComponent } from './components/cliente-edit/cliente-edit.component';
import { ClienteManagementComponent } from './components/cliente-management/cliente-management.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { MenuReseniaComponent } from './components/menu-resenia/menu-resenia.component';
import { MesaManagementComponent } from './components/mesa-management/mesa-management.component';
import { MesaComponent } from './components/mesa/mesa.component';
import { PlatoEditComponent } from './components/plato-edit/plato-edit.component';
import { PlatoManagementComponent } from './components/plato-management/plato-management.component';
import { PlatoComponent } from './components/plato/plato.component';
import { ReseniasComponent } from './components/resenias/resenias.component';
import { ReservaDetalleComponent } from './components/reserva-detalle/reserva-detalle.component';
import { ReservaManagementComponent } from './components/reserva-management/reserva-management.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { CategoriaPlatoComponent } from './components/categoria-plato/categoria-plato.component';
import { CategoriaManagementComponent } from './components/categoria-management/categoria-management.component';
import { ReseniaManagementComponent } from './components/resenia-management/resenia-management.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: {
      allowedRoles: ['cliente'],
    },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'reservas',
    component: ReservaComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: {
      allowedRoles: ['cliente'],
    },
  },
  {
    path: 'reservas/:id',
    component: ReservaDetalleComponent,
    canActivate: [authGuard],
  },
  {
    path: 'misdatos',
    component: ClienteDetalleComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: {
      allowedRoles: ['cliente'],
    },
  },
  {
    path: 'misdatos/edit',
    component: ClienteEditComponent,
    canActivate: [authGuard],
  },

  {
    path: 'nuevaReserva',
    component: MesaComponent,
    canActivate: [authGuard],
  },

  {
    path: 'resenias',
    component: MenuReseniaComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: {
      allowedRoles: ['cliente'],
    },
  },
  {
    path: 'resenias/all',
    component: ReseniasComponent,
    canActivate: [authGuard],
  },

  {
    path: 'registro',
    component: SignInComponent,
  },

  {
    path: 'platos',
    component: PlatoComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: {
      allowedRoles: ['cliente'],
    },
  },

  {
    path: 'categorias/:id',
    component: CategoriaPlatoComponent,
    canActivate: [authGuard],
  },
  
  {
    path: 'admin',
    component: MenuAdminComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: {
      allowedRoles: ['admin'],
    },
  },
  {
    path: 'admin/mesas',
    component: MesaManagementComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: {
      allowedRoles: ['admin'],
    },
  },
  {
    path: 'admin/clientes',
    component: ClienteManagementComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: {
      allowedRoles: ['admin'],
    },
  },
  {
    path: 'admin/clientes/:id',
    component: ClienteComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: {
      allowedRoles: ['admin'],
    },
  },
  {
    path: 'admin/reservas',
    component: ReservaManagementComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: {
      allowedRoles: ['admin'],
    },
  },
  {
    path: 'admin/platos',
    component: PlatoManagementComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: {
      allowedRoles: ['admin'],
    },
  },
  {
    path: 'admin/platos/edit/:id',
    component: PlatoEditComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: {
      allowedRoles: ['admin'],
    },
  },

  {
    path:'admin/categorias',
    component: CategoriaManagementComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data: {
      allowedRoles: ['admin'],
    },
  },

  {
    path:'admin/resenias',
    component: ReseniaManagementComponent,
    canActivate: [authGuard],
    canMatch: [roleGuard],
    data:{
      allowedRoles: ['admin']
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
