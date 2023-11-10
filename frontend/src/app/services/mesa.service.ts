import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//Habria que cambiar el nombre del servicio a otra cosa, no solo mesa.
@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  findMesasLibres(params: {
    cantPersonas: number;
    fechaHora: Date;
    ubicacion: String;
  }) {
    return this.http.get<any>(
      this.URL +
        `/mesas/libres/${params.cantPersonas}/${params.fechaHora}/${params.ubicacion}`
    );
  }
}
