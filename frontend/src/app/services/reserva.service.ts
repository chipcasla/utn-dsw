import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
