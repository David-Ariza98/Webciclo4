import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../modelo/user.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

url = "http://localhost:3000"
token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SecurityService) {
      this.token = this.seguridadService.getToken();
     }
     
     store(usuario: UserModel): Observable<UserModel> {
      return this.http.post<UserModel>(`${this.url}/user`, {
        Nombre: usuario.Nombre,
        Apellido: usuario.Apellido,
        Numero: usuario.Numero,
        Correo: usuario.Correo,
        Password: ''
      });
    }

    getAll(): Observable<UserModel[]>{
      return this.http.get<UserModel[]>(`${this.url}/user`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    update(usuario: UserModel): Observable<UserModel> {
      return this.http.patch<UserModel>(`${this.url}/user/${usuario.id}`, {
        Nombre: usuario.Nombre,
        Apellido: usuario.Apellido,
        Numero: usuario.Numero,
        Correo: usuario.Correo
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    delete(id: string): Observable<UserModel[]>{
      return this.http.delete<UserModel[]>(`${this.url}/user/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getWithId(id: string): Observable<UserModel>{
      return this.http.get<UserModel>(`${this.url}/usuarios/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getCount(): Observable<UserModel[]>{
      return this.http.get<UserModel[]>(`${this.url}/user/count`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
}
