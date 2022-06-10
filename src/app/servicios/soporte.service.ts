import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoporteService {
  url=environment.URL_BACKEND;
  constructor(private http:HttpClient) { }

  postSoporte(data:FormData):Observable<any>{
    return this.http.post(`${this.url}/api/soporte`,data);
  }

}
