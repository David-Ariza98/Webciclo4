import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flightModel } from '../modelo/flight.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

url = "http://localhost:3000"
token: string = ''

  constructor(private http : HttpClient,
    private seguridadservice : SecurityService) { 
      this.token = this.seguridadservice.getToken();
    }
  
  
    store(vuelo: flightModel): Observable<flightModel> {
      return this.http.post<flightModel>(`${this.url}/flights`, {
        FechaInicio: vuelo.FechaInicio, 
        HoraInicio: vuelo.HoraInicio,
        FechaFin: vuelo.FechaFin,
        HoraFin: vuelo.HoraFin,
        Asientos: vuelo.Asientos,
        NombrePiloto: vuelo.NombrePiloto,
        Ruta: vuelo.Ruta
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }
  
    getAll(): Observable<flightModel[]>{
      return this.http.get<flightModel[]>(`${this.url}/flights`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
  
    update(vuelo : flightModel): Observable<flightModel> {
      return this.http.patch<flightModel>(`${this.url}/flights/${vuelo.id}`, {
        FechaInicio: vuelo.FechaInicio, 
        HoraInicio: vuelo.HoraInicio,
        FechaFin: vuelo.FechaFin,
        HoraFin: vuelo.HoraFin,
        Asientos: vuelo.Asientos,
        NombrePiloto: vuelo.NombrePiloto,
        Ruta: vuelo.Ruta
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }
  
    delete(id: string): Observable<flightModel[]>{
      return this.http.delete<flightModel[]>(`${this.url}/flights/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
  
    getWithId(id: string): Observable<flightModel>{
      return this.http.get<flightModel>(`${this.url}/flights/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
  
    getCount(): Observable<flightModel[]>{
      return this.http.get<flightModel[]>(`${this.url}/flights/count`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
}
