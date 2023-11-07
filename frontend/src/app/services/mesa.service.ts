import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
//Habria que cambiar el nombre del servicio a otra cosa, no solo mesa. 
@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private URL = 'http://localhost:3000/api'

  constructor(private http: HttpClient ) { }

  findMesasLibres(params: {cantPersonas: number; fechaHora: Date; ubicacion: String}){
    const httpParams = new HttpParams()
      .set('cantPersonas', params.cantPersonas.toString())
      .set('fechaHora', params.fechaHora.toISOString())
      .set('ubicacion', params.ubicacion.toString())
    return this.http.get(this.URL+`/mesas?${httpParams.toString()}`)
  }
}