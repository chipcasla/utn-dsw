import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReseñaService {
  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  findByCliente(id: string){
    return this.http.get(`${this.URL}/resenias/id/${id}`)
  }

  addReseña(reseña: any){
   return this.http.post<any>(this.URL+'/resenias', reseña)
  }

  getReseñas(){
    return this.http.get<any>(`${this.URL}/resenias`)
  }

  deleteReseña(idReseña: number){
    return this.http.delete<any>(`${this.URL}/resenias/${idReseña}`)
  }
}
