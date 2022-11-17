import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteModel } from '../modelo/route.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

url = "http://localhost:3000"
token: string = ''

  constructor(private http : HttpClient,
    private seguridadservice : SecurityService) { 
      this.token = this.seguridadservice.getToken();
    }
  
  
    store(ruta: RouteModel): Observable<RouteModel> {
      return this.http.post<RouteModel>(`${this.url}/routes`, {
        destino: ruta.destino,
        origen: ruta.origen,
        TiempoEstimado: ruta.TiempoEstimado,
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }
  
    getAll(): Observable<RouteModel[]>{
      return this.http.get<RouteModel[]>(`${this.url}/routes`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
  
    update(ruta : RouteModel): Observable<RouteModel> {
      return this.http.patch<RouteModel>(`${this.url}/routes/${ruta.id}`, {
        Destino: ruta.destino,
        Origen: ruta.origen,
        TiempoEstimado: ruta.TiempoEstimado,
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }
  
    delete(id: string): Observable<RouteModel[]>{
      return this.http.delete<RouteModel[]>(`${this.url}/routes/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
  
    getWithId(id: string): Observable<RouteModel>{
      return this.http.get<RouteModel>(`${this.url}/routes/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
  
    getCount(): Observable<RouteModel[]>{
      return this.http.get<RouteModel[]>(`${this.url}/routes/count`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
}
