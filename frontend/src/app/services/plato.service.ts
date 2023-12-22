import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatoService {
  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getOne(idPlato: number) {
    return this.http.get<any>(`${this.URL}/platos/${idPlato}`);
  }
  getPlatos() {
    return this.http.get<any>(`${this.URL}/platos`);
  }

  getByCategoria(idCategoria: number){
    return this.http.get(`${this.URL}/platos/categoria/${idCategoria}`)
  }

  addPlato(datosPlato: any) {
    return this.http.post<any>(`${this.URL}/platos`, datosPlato);
  }

  deletePlato(idPlato: number) {
    return this.http.delete<any>(`${this.URL}/platos/${idPlato}`);
  }

  updatePlato(idPlato: number, plato: any) {
    return this.http.get<any>(`${this.URL}/platos/${idPlato}`).pipe(
      switchMap((oldPlato) => {
        const updatedPlato = { ...oldPlato, ...plato };
        return this.http.put(`${this.URL}/platos/${idPlato}`, updatedPlato);
      })
    );
  }
}
