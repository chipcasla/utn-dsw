import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  
  private URL = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

  getPlatos(){
    return this.http.get<any>(`${this.URL}/platos`)
  }

  addPlato(datosPlato: any){
    return this.http.post<any>(`${this.URL}/platos`, datosPlato)
  }

  deletePlato(idPlato: number){
    return this.http.delete<any>(`${this.URL}/platos/${idPlato}`)
  }
}
