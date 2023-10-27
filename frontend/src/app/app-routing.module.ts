import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDetalleComponent } from './components/cliente-detalle/cliente-detalle.component';
import { HomeComponent } from './components/home/home.component';
import { ReservaComponent } from './components/reserva/reserva.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reservas', component: ReservaComponent },
  { path: 'misdatos', component: ClienteDetalleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
