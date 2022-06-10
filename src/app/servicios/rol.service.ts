import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  url=environment.URL_BACKEND;
  constructor(private http:HttpClient) { }

  getRoles(active:number):Observable<any>{
    return this.http.get(`${this.url}/api/rol`,{params:{active}});
  }
}
