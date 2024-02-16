import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private URL = environment.URL_API;

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get(`${this.URL}/categorias`);
  }

  findOne(idCategoria: number) {
    return this.http.get(`${this.URL}/categorias/${idCategoria}`);
  }

  addCategoria(datosCategoria: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/categorias`, datosCategoria);
  }

  editCategoria(idCategoria: number, datosCategoria: any): Observable<any> {
    return this.http.put<any>(
      `${this.URL}/categorias/${idCategoria}`,
      datosCategoria
    );
  }

  removeCategoria(idCategoria: any) {
    return this.http.delete(`${this.URL}/categorias/${idCategoria}`);
  }
}
