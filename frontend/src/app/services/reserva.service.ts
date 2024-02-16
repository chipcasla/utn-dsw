import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private URL = environment.URL_API;

  constructor(private http: HttpClient) {}

  getReservas() {
    return this.http.get<any>(this.URL + '/reservas');
  }

  getByUser(idCliente: number) {
    return this.http.get<any>(`${this.URL}/reservas/id/${idCliente}`);
  }

  getReservationDetails(id: string) {
    const url = `${this.URL}/reservas/${id}`;
    return this.http.get<any>(url);
  }

  cancelarReserva(id: number, reserva: { estado: string }) {
    const url = `${this.URL}/reservas/${id}`;
    return this.http.put<any>(url, reserva);
  }

  setStatusReserva(
    idReserva: number,
    reserva: { estado: string }
  ): Observable<any> {
    return this.http.get<any>(`${this.URL}/reservas/${idReserva}`).pipe(
      switchMap((beforeReserva) => {
        const nuevaReserva = { ...beforeReserva, ...reserva };

        const url = `${this.URL}/reservas/${idReserva}`;
        return this.http.put<any>(url, nuevaReserva);
      })
    );
  }

  getPendientes() {
    return this.http.get<any>(`${this.URL}/reservas/pendientes`);
  }
}
