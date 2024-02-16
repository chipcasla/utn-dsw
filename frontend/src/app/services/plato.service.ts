import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlatoService {
  private URL = environment.URL_API;

  constructor(private http: HttpClient) {}

  getOne(idPlato: number) {
    return this.http.get<any>(`${this.URL}/platos/${idPlato}`);
  }
  getPlatos() {
    return this.http.get<any>(`${this.URL}/platos`);
  }

  getByCategoria(idCategoria: number | string) {
    return this.http.get(`${this.URL}/platos/categoria/${idCategoria}`);
  }

  addPlato(datosPlato: any) {
    return this.http.post<any>(`${this.URL}/platos`, datosPlato);
  }

  deletePlato(idPlato: number) {
    return this.http.delete<any>(`${this.URL}/platos/${idPlato}`);
  }

  updatePlato(idPlato: number, datosPlato: any) {
    return this.http.put(`${this.URL}/platos/${idPlato}`, datosPlato);
  }
}
