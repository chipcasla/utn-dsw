import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddReservaService {
  private URL = environment.URL_API;

  constructor(private http: HttpClient) {}

  addReserva(
    idCliente: number,
    idMesa: number,
    fechaHora: Date
  ): Observable<any> {
    const datosReserva = {
      idCliente: idCliente,
      idMesa: idMesa,
      fechaHora: fechaHora.toISOString(),
    };
    return this.http.post(`${this.URL}/reservas`, datosReserva);
  }
}
