import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor() {}

  getUserId() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const userId = decoded.id;
      return userId;
    }
    return null;
  }
}
