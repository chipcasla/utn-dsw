import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddReservaService {
  private URL = 'http://localhost:3000/api'

  constructor(private http: HttpClient) {};

  addReserva(dniCliente:string, idMesa: number, fechaHora: Date, ): Observable<any>{
    const datosReserva = {
      dniCliente: dniCliente,
      idMesa: idMesa,
      fechaHora: fechaHora.toISOString()
    }
    return this.http.post(`${this.URL}/addReserva`, datosReserva)
  }
}
