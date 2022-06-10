import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url=environment.URL_BACKEND;
  constructor(private http:HttpClient) { }


  getUsers(active:string):Observable<any>{
    return this.http.get(`${this.url}/api/user`,{params:{active}});
  }
  getUser(id:string):Observable<any>{
    return this.http.get(`${this.url}/api/user/${id}`);
  }
  postUser(data:FormData):Observable<any>{
    return this.http.post(`${this.url}/api/user`,data);
  }
  putUser(data:FormData, id:string):Observable<any>{
    return this.http.put(`${this.url}/api/user/${id}`,data);
  }
  deleteUser(id:string,active:string):Observable<any>{
    return this.http.delete(`${this.url}/api/user/${id}/${active}`);
  }
}
