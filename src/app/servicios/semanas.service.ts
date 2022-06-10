import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SemanasService {
  url=environment.URL_BACKEND;
  constructor(private http:HttpClient) { }

  getSemanas():Observable<any>{
    return this.http.get(`${this.url}/api/semanas`);
  }
}
