import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ClienteService } from './cliente.service';
//Habria que cambiar el nombre del servicio a otra cosa, no solo mesa.
@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private URL = environment.URL_API;

  constructor(
    private http: HttpClient,
    private clienteService: ClienteService
  ) {}

  findMesasLibres(params: {
    cantPersonas: number;
    fechaHora: Date;
    ubicacion: String;
  }) {
    console.log(typeof this.clienteService.getUserId());
    return this.http.get<any>(
      this.URL +
        `/mesas/libres/${params.cantPersonas}/${params.fechaHora}/${params.ubicacion}`
    );
  }

  addReservation(reservation: any): Observable<any> {
    reservation.cliente = this.clienteService.getUserId();
    return this.http.post<any>(this.URL + `/reservas`, reservation);
  }

  findAll() {
    return this.http.get<any>(this.URL + `/mesas`);
  }

  addMesa(datosMesa: any) {
    return this.http.post(`${this.URL}/mesas`, datosMesa);
  }

  deleteMesa(idMesa: number) {
    return this.http.delete(`${this.URL}/mesas/${idMesa}`);
  }
}
