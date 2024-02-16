import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReseñaService {
  private URL = environment.URL_API;

  constructor(private http: HttpClient) {}

  findByCliente(id: string) {
    return this.http.get(`${this.URL}/resenias/id/${id}`);
  }

  addReseña(reseña: any) {
    return this.http.post<any>(this.URL + '/resenias', reseña);
  }

  getReseñas() {
    return this.http.get<any>(`${this.URL}/resenias`);
  }

  editResenia(idResenia: number, resenia: any) {
    return this.http.put<any>(`${this.URL}/resenias/${idResenia}`, resenia);
  }

  deleteReseña(idReseña: number) {
    return this.http.delete<any>(`${this.URL}/resenias/${idReseña}`);
  }
}
