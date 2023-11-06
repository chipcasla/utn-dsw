import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  private URL = 'http://localhost:3000/api/clientes'; //esta ruta creeria que hay que cambiarla
  constructor(private http: HttpClient) {}

  addCliente(datosCliente: any){
    return this.http.post(`${this.URL}/registro`, datosCliente);
  }
}
