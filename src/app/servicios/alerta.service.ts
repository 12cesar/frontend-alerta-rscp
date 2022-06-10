import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  url=environment.URL_BACKEND;
  constructor(private http:HttpClient) { }
  getAtencion():Observable<any>{
    return this.http.get(`${this.url}/api/alerta/mostrar/atencion`);
  }
  getAlertas(estado:string):Observable<any>{
    return this.http.get(`${this.url}/api/alerta`,{params:{estado}});
  }
  postAlerta(data:FormData):Observable<any>{
    return this.http.post(`${this.url}/api/alerta`,data);
  }
}
