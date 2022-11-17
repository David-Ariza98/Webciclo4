import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AirportModel } from '../modelo/airport.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

url = "http://localhost:3000"
token: string = ''

  constructor(private http : HttpClient,
              private seguridadservice : SecurityService) { 
                this.token = this.seguridadservice.getToken();
              }
  
  store(aeropuerto: AirportModel): Observable<AirportModel> {
    return this.http.post<AirportModel>(`${this.url}/airports`, {
      Nombre: aeropuerto.Nombre, 
      Ciudad: aeropuerto.Ciudad,
      Pais: aeropuerto.Pais,
      CoorX: aeropuerto.CoorX,
      CoorY: aeropuerto.CoorY,
      Siglas: aeropuerto.Siglas,
      Tipo: aeropuerto.Tipo
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  getAll(): Observable<AirportModel[]>{
    return this.http.get<AirportModel[]>(`${this.url}/airports`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(aeropuerto : AirportModel): Observable<AirportModel> {
    return this.http.patch<AirportModel>(`${this.url}/airports/${aeropuerto.id}`, {
      Nombre: aeropuerto.Nombre, 
      Ciudad: aeropuerto.Ciudad,
      Pais: aeropuerto.Pais,
      CoorX: aeropuerto.CoorX,
      CoorY: aeropuerto.CoorY,
      Siglas: aeropuerto.Siglas,
      Tipo: aeropuerto.Tipo
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<AirportModel[]>{
    return this.http.delete<AirportModel[]>(`${this.url}/airports/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<AirportModel>{
    return this.http.get<AirportModel>(`${this.url}/airports/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getCount(): Observable<AirportModel[]>{
    return this.http.get<AirportModel[]>(`${this.url}/airports/count`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
}
