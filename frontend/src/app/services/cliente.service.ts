import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private URL = environment.URL_API;

  constructor(private http: HttpClient) {}

  getUserId() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const userId = decoded.id;
      return userId;
    }
    return null;
  }

  findAll() {
    return this.http.get<any>(this.URL + `/clientes`);
  }

  addCliente(datosCliente: any): Observable<any> {
    return this.http.post(`${this.URL}/clientes`, datosCliente);
  }

  deleteCliente(idCliente: number) {
    return this.http.delete(`${this.URL}/clientes/${idCliente}`);
  }

  findOne(idCliente: number) {
    return this.http.get(`${this.URL}/clientes/${idCliente}`);
  }

  findByDni(dniCliente: string) {
    return this.http.get(`${this.URL}/clientes/dni/${dniCliente}`);
  }

  updateCliente(idCliente: number, cliente: any) {
    return this.http.put(`${this.URL}/clientes/${idCliente}`, cliente);
  }
}
