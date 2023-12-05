import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getReservas() {
    return this.http.get<any>(this.URL + '/reservas');
  }

  getReservationDetails(id: string) {
    const url = `${this.URL}/reservas/${id}`;
    return this.http.get<any>(url);
  }

  cancelarReserva(id: number, reserva: { estado: string }) {
    const url = `${this.URL}/reservas/${id}`;
    return this.http.put<any>(url, reserva);
  }

  setStatusReserva(idReserva: number, reserva: {estado: string}): Observable<any> {
    return this.http.get<any>(`${this.URL}/reservas/${idReserva}`).pipe(
      switchMap((beforeReserva) => {
        // Combina los datos actuales con los nuevos datos
        const nuevaReserva = {...beforeReserva, ...reserva};

        // Realiza la solicitud HTTP PUT con la reserva actualizada
        const url = `${this.URL}/reservas/${idReserva}`;
        return this.http.put<any>(url, nuevaReserva);
      })
    );
  }
}
